import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { AuthRepository } from './repositories/auth.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    // Verificar si el email ya existe
    const existingUser = await this.authRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    // Crear el usuario
    const user = new User();
    user.email = createUserDto.email;
    user.password = hashedPassword;
    user.displayName = createUserDto.displayName;
    user.phoneNumber = createUserDto.phoneNumber;

    const savedUser = await this.authRepository.create(user);

    // Generar tokens
    const payload = { sub: savedUser.id, email: savedUser.email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = uuidv4();

    // Guardar refresh token
    await this.authRepository.saveRefreshToken(savedUser.id, refreshToken);

    // Remover la contraseña del objeto a devolver
    const { password, ...result } = savedUser;

    return {
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        user: result,
        accessToken,
        refreshToken,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.authRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar tokens
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = uuidv4();

    // Guardar refresh token
    await this.authRepository.saveRefreshToken(user.id, refreshToken);

    // Remover la contraseña del objeto a devolver
    const { password, ...result } = user;

    return {
      success: true,
      message: 'Inicio de sesión exitoso',
      data: {
        user: result,
        accessToken,
        refreshToken,
      },
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<any> {
    const userId = await this.authRepository.validateRefreshToken(refreshTokenDto.refreshToken);
    if (!userId) {
      throw new UnauthorizedException('Token inválido');
    }

    const user = await this.authRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Generar nuevos tokens
    const payload = { sub: user.id, email: user.email };
    const newAccessToken = this.jwtService.sign(payload);
    const newRefreshToken = uuidv4();

    // Guardar nuevo refresh token
    await this.authRepository.saveRefreshToken(user.id, newRefreshToken);

    return {
      success: true,
      message: 'Token refrescado exitosamente',
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    };
  }

  async googleLogin(googleUser: any): Promise<any> {
    let user = await this.authRepository.findByEmail(googleUser.email);
    
    if (!user) {
      // Crear nuevo usuario con datos de Google
      user = new User();
      user.email = googleUser.email;
      user.displayName = googleUser.displayName;
      user.avatarUrl = googleUser.photo;
      user.isEmailVerified = true; // Google ya verifica el email
      
      const savedUser = await this.authRepository.create(user);
      user = savedUser;
    }

    // Generar tokens
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = uuidv4();

    // Guardar refresh token
    await this.authRepository.saveRefreshToken(user.id, refreshToken);

    return {
      success: true,
      message: 'Autenticación con Google exitosa',
      data: {
        user,
        accessToken,
        refreshToken,
      },
    };
  }

  async facebookLogin(facebookUser: any): Promise<any> {
    let user = await this.authRepository.findByEmail(facebookUser.email);
    
    if (!user) {
      // Crear nuevo usuario con datos de Facebook
      user = new User();
      user.email = facebookUser.email;
      user.displayName = facebookUser.displayName;
      user.avatarUrl = facebookUser.photo;
      user.isEmailVerified = true; // Facebook ya verifica el email
      
      const savedUser = await this.authRepository.create(user);
      user = savedUser;
    }

    // Generar tokens
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = uuidv4();

    // Guardar refresh token
    await this.authRepository.saveRefreshToken(user.id, refreshToken);

    return {
      success: true,
      message: 'Autenticación con Facebook exitosa',
      data: {
        user,
        accessToken,
        refreshToken,
      },
    };
  }

  async getProfile(userId: string): Promise<User> {
    const user = await this.authRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    
    // Remover la contraseña del objeto a devolver
    const { password, ...result } = user;
    return result as User;
  }

  async logout(userId: string): Promise<void> {
    await this.authRepository.invalidateRefreshToken(userId);
  }
}
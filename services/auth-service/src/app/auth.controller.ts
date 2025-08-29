import { Controller, Post, Body, Get, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from './entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const result = await this.authService.register(createUserDto);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const result = await this.authService.login(loginDto);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refrescar token de acceso' })
  @ApiResponse({ status: 200, description: 'Token refrescado exitosamente' })
  @ApiResponse({ status: 401, description: 'Token inválido' })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto, @Res() res: Response) {
    try {
      const result = await this.authService.refreshToken(refreshTokenDto);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Token inválido',
      });
    }
  }

  @Get('google')
  @ApiOperation({ summary: 'Iniciar autenticación con Google' })
  @ApiResponse({ status: 302, description: 'Redirección a Google' })
  async googleAuth(@Req() req: Request, @Res() res: Response) {
    // Esta ruta será manejada por el GoogleStrategy
    // Passport automáticamente redirigirá a Google
  }

  @Get('google/callback')
  @ApiOperation({ summary: 'Callback de autenticación con Google' })
  @ApiResponse({ status: 200, description: 'Autenticación exitosa con Google' })
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.authService.googleLogin(req.user as any);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Autenticación con Google fallida',
      });
    }
  }

  @Get('facebook')
  @ApiOperation({ summary: 'Iniciar autenticación con Facebook' })
  @ApiResponse({ status: 302, description: 'Redirección a Facebook' })
  async facebookAuth(@Req() req: Request, @Res() res: Response) {
    // Esta ruta será manejada por el FacebookStrategy
    // Passport automáticamente redirigirá a Facebook
  }

  @Get('facebook/callback')
  @ApiOperation({ summary: 'Callback de autenticación con Facebook' })
  @ApiResponse({ status: 200, description: 'Autenticación exitosa con Facebook' })
  async facebookAuthCallback(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.authService.facebookLogin(req.user as any);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Autenticación con Facebook fallida',
      });
    }
  }

  @Get('profile')
  @ApiOperation({ summary: 'Obtener perfil del usuario' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Perfil del usuario' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getProfile(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as User;
      const profile = await this.authService.getProfile(user.id);
      return res.status(HttpStatus.OK).json({
        success: true,
        data: profile,
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'No autorizado',
      });
    }
  }

  @Post('logout')
  @ApiOperation({ summary: 'Cerrar sesión' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Sesión cerrada exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as User;
      await this.authService.logout(user.id);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Sesión cerrada exitosamente',
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'No autorizado',
      });
    }
  }
}
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginDto, RegisterDto, ApiResponse } from '@buscamiperro/shared';

@Injectable()
export class AuthService {
  private readonly authServiceUrl = environment.services.auth;

  constructor(private readonly httpService: HttpService) {}

  async login(loginDto: LoginDto): Promise<ApiResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/auth/login`, loginDto)
      );
      return response.data;
    } catch (error) {
      console.error('Auth service error:', error.message);
      return {
        success: false,
        message: 'Authentication service unavailable',
        errors: ['Service temporarily unavailable']
      };
    }
  }

  async register(registerDto: RegisterDto): Promise<ApiResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/auth/register`, registerDto)
      );
      return response.data;
    } catch (error) {
      console.error('Auth service error:', error.message);
      return {
        success: false,
        message: 'Registration service unavailable',
        errors: ['Service temporarily unavailable']
      };
    }
  }

  async refresh(refreshToken: string): Promise<ApiResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/auth/refresh`, { refreshToken })
      );
      return response.data;
    } catch (error) {
      console.error('Auth service error:', error.message);
      return {
        success: false,
        message: 'Token refresh service unavailable',
        errors: ['Service temporarily unavailable']
      };
    }
  }

  async logout(): Promise<ApiResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/auth/logout`, {})
      );
      return response.data;
    } catch (error) {
      console.error('Auth service error:', error.message);
      return {
        success: false,
        message: 'Logout service unavailable',
        errors: ['Service temporarily unavailable']
      };
    }
  }

  async getProfile(): Promise<ApiResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.authServiceUrl}/auth/me`)
      );
      return response.data;
    } catch (error) {
      console.error('Auth service error:', error.message);
      return {
        success: false,
        message: 'Profile service unavailable',
        errors: ['Service temporarily unavailable']
      };
    }
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/auth/forgot-password`, { email })
      );
      return response.data;
    } catch (error) {
      console.error('Auth service error:', error.message);
      return {
        success: false,
        message: 'Password reset service unavailable',
        errors: ['Service temporarily unavailable']
      };
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<ApiResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/auth/reset-password`, { token, newPassword })
      );
      return response.data;
    } catch (error) {
      console.error('Auth service error:', error.message);
      return {
        success: false,
        message: 'Password reset service unavailable',
        errors: ['Service temporarily unavailable']
      };
    }
  }

  async googleLogin(token: string): Promise<ApiResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/auth/google`, { token })
      );
      return response.data;
    } catch (error) {
      console.error('Auth service error:', error.message);
      return {
        success: false,
        message: 'Google login service unavailable',
        errors: ['Service temporarily unavailable']
      };
    }
  }

  async facebookLogin(token: string): Promise<ApiResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/auth/facebook`, { token })
      );
      return response.data;
    } catch (error) {
      console.error('Auth service error:', error.message);
      return {
        success: false,
        message: 'Facebook login service unavailable',
        errors: ['Service temporarily unavailable']
      };
    }
  }
}
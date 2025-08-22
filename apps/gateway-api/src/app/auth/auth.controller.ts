import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, ApiResponse as ApiResponseType } from '@buscamiperro/shared';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<ApiResponseType> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'Registration successful' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async register(@Body() registerDto: RegisterDto): Promise<ApiResponseType> {
    return this.authService.register(registerDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(@Body() body: { refreshToken: string }): Promise<ApiResponseType> {
    return this.authService.refresh(body.refreshToken);
  }

  @Post('logout')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  async logout(): Promise<ApiResponseType> {
    return this.authService.logout();
  }

  @Get('me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(): Promise<ApiResponseType> {
    return this.authService.getProfile();
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  async forgotPassword(@Body() body: { email: string }): Promise<ApiResponseType> {
    return this.authService.forgotPassword(body.email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiResponse({ status: 200, description: 'Password reset successful' })
  @ApiResponse({ status: 400, description: 'Invalid token' })
  async resetPassword(@Body() body: { token: string; newPassword: string }): Promise<ApiResponseType> {
    return this.authService.resetPassword(body.token, body.newPassword);
  }

  @Post('google')
  @ApiOperation({ summary: 'Google OAuth login' })
  @ApiResponse({ status: 200, description: 'Google login successful' })
  async googleLogin(@Body() body: { token: string }): Promise<ApiResponseType> {
    return this.authService.googleLogin(body.token);
  }

  @Post('facebook')
  @ApiOperation({ summary: 'Facebook OAuth login' })
  @ApiResponse({ status: 200, description: 'Facebook login successful' })
  async facebookLogin(@Body() body: { token: string }): Promise<ApiResponseType> {
    return this.authService.facebookLogin(body.token);
  }
}
import { Controller, Get, Post, Body, Param, Query, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AnalyticsService } from './analytics.service';
import { TrackEventDto } from './dto/track-event.dto';
import { AnalyticsEvent } from './entities/analytics.entity';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  @ApiOperation({ summary: 'Registrar un evento de analítica' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Evento registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async trackEvent(@Body() trackEventDto: TrackEventDto, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub; // Obtener ID del usuario del token JWT
      const result = await this.analyticsService.trackEvent(trackEventDto, userId);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Obtener datos del dashboard de analítica' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Datos del dashboard' })
  async getDashboard(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.analyticsService.getDashboard(userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener datos del dashboard',
      });
    }
  }

  @Get('metrics')
  @ApiOperation({ summary: 'Obtener métricas específicas' })
  @ApiQuery({ name: 'metric', required: true, type: String })
  @ApiQuery({ name: 'period', required: false, type: String })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Métricas solicitadas' })
  async getMetrics(
    @Query('metric') metric: string,
    @Query('period') period?: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      if (!metric) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'El parámetro de métrica es requerido',
        });
      }
      
      const userId = (req.user as any).sub;
      const result = await this.analyticsService.getMetrics(metric, period, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get('trends')
  @ApiOperation({ summary: 'Obtener tendencias de uso' })
  @ApiQuery({ name: 'period', required: false, type: String })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Tendencias de uso' })
  async getTrends(@Query('period') period?: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.analyticsService.getTrends(period, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener tendencias',
      });
    }
  }

  @Get('reports')
  @ApiOperation({ summary: 'Obtener reportes analíticos' })
  @ApiQuery({ name: 'type', required: true, type: String })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Reportes analíticos' })
  async getReports(
    @Query('type') type: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      if (!type) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'El parámetro de tipo de reporte es requerido',
        });
      }
      
      const userId = (req.user as any).sub;
      const result = await this.analyticsService.getReports(type, startDate, endDate, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }
}
import { Injectable, BadRequestException } from '@nestjs/common';
import { AnalyticsRepository } from './repositories/analytics.repository';
import { TrackEventDto } from './dto/track-event.dto';
import { AnalyticsEvent } from './entities/analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(private readonly analyticsRepository: AnalyticsRepository) {}

  async trackEvent(trackEventDto: TrackEventDto, userId: string): Promise<any> {
    try {
      const event = new AnalyticsEvent();
      Object.assign(event, trackEventDto);
      event.userId = userId;
      
      const savedEvent = await this.analyticsRepository.create(event);
      
      return {
        success: true,
        message: 'Evento registrado exitosamente',
        data: savedEvent,
      };
    } catch (error) {
      throw new BadRequestException('Error al registrar el evento');
    }
  }

  async getDashboard(userId: string): Promise<any> {
    try {
      const dashboardData = await this.analyticsRepository.getDashboardData(userId);
      
      return {
        success: true,
        data: dashboardData,
      };
    } catch (error) {
      throw new Error('Error al obtener datos del dashboard');
    }
  }

  async getMetrics(metric: string, period: string, userId: string): Promise<any> {
    try {
      const metricsData = await this.analyticsRepository.getMetrics(metric, period, userId);
      
      return {
        success: true,
        data: metricsData,
      };
    } catch (error) {
      throw new BadRequestException('Error al obtener métricas');
    }
  }

  async getTrends(period: string, userId: string): Promise<any> {
    try {
      const trendsData = await this.analyticsRepository.getTrends(period, userId);
      
      return {
        success: true,
        data: trendsData,
      };
    } catch (error) {
      throw new Error('Error al obtener tendencias');
    }
  }

  async getReports(type: string, startDate: string, endDate: string, userId: string): Promise<any> {
    try {
      const reportsData = await this.analyticsRepository.getReports(type, startDate, endDate, userId);
      
      return {
        success: true,
        data: reportsData,
      };
    } catch (error) {
      throw new BadRequestException('Error al obtener reportes');
    }
  }
}
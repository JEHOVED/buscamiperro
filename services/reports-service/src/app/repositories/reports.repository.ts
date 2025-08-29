import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Report, ReportType } from '../entities/report.entity';

@Injectable()
export class ReportsRepository {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async create(report: Report): Promise<Report> {
    return await this.reportRepository.save(report);
  }

  async findAll(userId: string, page: number = 1, limit: number = 10, type?: string): Promise<[Report[], number]> {
    const skip = (page - 1) * limit;
    
    const where: any = { userId };
    if (type) {
      where.type = type;
    }
    
    return await this.reportRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<Report | null> {
    return await this.reportRepository.findOne({ where: { id } });
  }

  async getStatistics(userId: string): Promise<any> {
    // En una implementación real, esto haría consultas complejas a la base de datos
    // para obtener estadísticas del sistema
    return {
      totalReports: await this.reportRepository.count({ where: { userId } }),
      reportsByType: await this.reportRepository
        .createQueryBuilder('report')
        .select('report.type', 'type')
        .addSelect('COUNT(report.id)', 'count')
        .where('report.userId = :userId', { userId })
        .groupBy('report.type')
        .getRawMany(),
    };
  }

  async getAnalytics(userId: string): Promise<any> {
    // En una implementación real, esto haría consultas complejas para análisis de datos
    return {
      recentReports: await this.reportRepository
        .find({
          where: { userId },
          order: { createdAt: 'DESC' },
          take: 5,
        }),
      popularReportTypes: await this.reportRepository
        .createQueryBuilder('report')
        .select('report.type', 'type')
        .addSelect('COUNT(report.id)', 'count')
        .groupBy('report.type')
        .orderBy('count', 'DESC')
        .limit(5)
        .getRawMany(),
    };
  }
}
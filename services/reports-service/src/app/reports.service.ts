import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ReportsRepository } from './repositories/reports.repository';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(private readonly reportsRepository: ReportsRepository) {}

  async generate(createReportDto: CreateReportDto, userId: string): Promise<any> {
    try {
      const report = new Report();
      Object.assign(report, createReportDto);
      report.userId = userId;
      
      // Generar el contenido del reporte según el tipo
      const reportContent = await this.generateReportContent(createReportDto.type, createReportDto.parameters);
      report.content = reportContent;
      
      const savedReport = await this.reportsRepository.create(report);
      
      return {
        success: true,
        message: 'Reporte generado exitosamente',
        data: savedReport,
      };
    } catch (error) {
      throw new BadRequestException('Error al generar el reporte');
    }
  }

  async findAll(userId: string, page: number = 1, limit: number = 10, type?: string): Promise<any> {
    try {
      const [reports, total] = await this.reportsRepository.findAll(userId, page, limit, type);
      
      return {
        success: true,
        data: reports,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error('Error al obtener la lista de reportes');
    }
  }

  async findOne(id: string, userId: string): Promise<any> {
    try {
      const report = await this.reportsRepository.findById(id);
      if (!report) {
        throw new NotFoundException('Reporte no encontrado');
      }
      
      // Verificar que el reporte pertenezca al usuario
      if (report.userId !== userId) {
        throw new ForbiddenException('No autorizado');
      }
      
      return {
        success: true,
        data: report,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error('Error al obtener el reporte');
    }
  }

  async download(id: string, userId: string): Promise<any> {
    try {
      const report = await this.reportsRepository.findById(id);
      if (!report) {
        throw new NotFoundException('Reporte no encontrado');
      }
      
      // Verificar que el reporte pertenezca al usuario
      if (report.userId !== userId) {
        throw new ForbiddenException('No autorizado');
      }
      
      // Generar buffer del PDF (en una implementación real se usaría una librería como pdfkit o html-pdf)
      const buffer = Buffer.from(JSON.stringify(report.content), 'utf-8');
      const filename = `report-${report.id}.pdf`;
      
      return {
        buffer,
        filename,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error('Error al descargar el reporte');
    }
  }

  async getStatistics(userId: string): Promise<any> {
    try {
      const statistics = await this.reportsRepository.getStatistics(userId);
      
      return {
        success: true,
        data: statistics,
      };
    } catch (error) {
      throw new Error('Error al obtener estadísticas');
    }
  }

  async getAnalytics(userId: string): Promise<any> {
    try {
      const analytics = await this.reportsRepository.getAnalytics(userId);
      
      return {
        success: true,
        data: analytics,
      };
    } catch (error) {
      throw new Error('Error al obtener análisis de datos');
    }
  }

  private async generateReportContent(type: string, parameters: any): Promise<any> {
    // En una implementación real, esto generaría contenido específico según el tipo de reporte
    // Por ahora retornamos un objeto de ejemplo
    return {
      type,
      generatedAt: new Date(),
      parameters,
      data: {
        message: `Contenido del reporte de tipo ${type}`,
        sampleData: parameters,
      },
    };
  }
}
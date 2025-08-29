import { Controller, Get, Post, Body, Param, Query, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @ApiOperation({ summary: 'Generar un nuevo reporte' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Reporte generado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async generateReport(@Body() createReportDto: CreateReportDto, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub; // Obtener ID del usuario del token JWT
      const result = await this.reportsService.generate(createReportDto, userId);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de reportes' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'type', required: false, type: String })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Lista de reportes' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('type') type?: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.reportsService.findAll(userId, page, limit, type);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener la lista de reportes',
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalles de un reporte por ID' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Detalles del reporte' })
  @ApiResponse({ status: 404, description: 'Reporte no encontrado' })
  async findOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.reportsService.findOne(id, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Reporte no encontrado',
      });
    }
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'Descargar un reporte por ID' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Reporte descargado exitosamente' })
  @ApiResponse({ status: 404, description: 'Reporte no encontrado' })
  async download(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const reportData = await this.reportsService.download(id, userId);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${reportData.filename}"`);
      return res.send(reportData.buffer);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Reporte no encontrado',
      });
    }
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Obtener estadísticas del sistema' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Estadísticas del sistema' })
  async getStatistics(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.reportsService.getStatistics(userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener estadísticas',
      });
    }
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Obtener análisis de datos' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Análisis de datos' })
  async getAnalytics(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.reportsService.getAnalytics(userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener análisis de datos',
      });
    }
  }
}
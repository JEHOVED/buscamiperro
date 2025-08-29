import { IsString, IsNotEmpty, IsOptional, IsObject, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ReportType {
  DOGS_SUMMARY = 'dogs_summary',
  SIGHTINGS_SUMMARY = 'sightings_summary',
  MATCHES_SUMMARY = 'matches_summary',
  USER_ACTIVITY = 'user_activity',
  GEOGRAPHIC_DISTRIBUTION = 'geographic_distribution',
  MONTHLY_REPORT = 'monthly_report',
}

export class CreateReportDto {
  @ApiProperty({
    example: 'dogs_summary',
    enum: ReportType,
    description: 'Tipo de reporte a generar',
  })
  @IsEnum(ReportType)
  @IsNotEmpty()
  type: ReportType;

  @ApiPropertyOptional({
    example: { startDate: '2023-01-01', endDate: '2023-12-31', location: 'Ciudad de México' },
    description: 'Parámetros para la generación del reporte',
  })
  @IsObject()
  @IsOptional()
  parameters?: any;

  @ApiPropertyOptional({
    example: 'Reporte anual de perros perdidos',
    description: 'Nombre descriptivo del reporte',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    example: 'uuid-user-id',
    description: 'ID del usuario que solicita el reporte (opcional, se obtiene del token)',
  })
  @IsString()
  @IsOptional()
  userId?: string;
}
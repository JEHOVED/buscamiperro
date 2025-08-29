import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ReportType {
  DOGS_SUMMARY = 'dogs_summary',
  SIGHTINGS_SUMMARY = 'sightings_summary',
  MATCHES_SUMMARY = 'matches_summary',
  USER_ACTIVITY = 'user_activity',
  GEOGRAPHIC_DISTRIBUTION = 'geographic_distribution',
  MONTHLY_REPORT = 'monthly_report',
}

export enum ReportStatus {
  PENDING = 'pending',
  GENERATING = 'generating',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity('reports')
export class Report {
  @ApiProperty({
    example: 'uuid-generated-id',
    description: 'ID único del reporte',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'uuid-user-id',
    description: 'ID del usuario que solicitó el reporte',
  })
  @Column()
  @Index()
  userId: string;

  @ApiProperty({
    example: 'dogs_summary',
    enum: ReportType,
    description: 'Tipo de reporte',
  })
  @Column({
    type: 'enum',
    enum: ReportType,
  })
  @Index()
  type: ReportType;

  @ApiPropertyOptional({
    example: 'Reporte anual de perros perdidos',
    description: 'Nombre descriptivo del reporte',
  })
  @Column({ nullable: true })
  title?: string;

  @ApiProperty({
    example: 'completed',
    enum: ReportStatus,
    description: 'Estado del reporte',
  })
  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.COMPLETED,
  })
  status: ReportStatus;

  @ApiPropertyOptional({
    example: { startDate: '2023-01-01', endDate: '2023-12-31', location: 'Ciudad de México' },
    description: 'Parámetros utilizados para la generación del reporte',
  })
  @Column({ type: 'json', nullable: true })
  parameters?: any;

  @ApiPropertyOptional({
    example: { type: 'dogs_summary', generatedAt: '2023-01-01T00:00:00Z', data: {} },
    description: 'Contenido del reporte',
  })
  @Column({ type: 'json', nullable: true })
  content?: any;

  @ApiPropertyOptional({
    example: 'https://example.com/reports/report-123.pdf',
    description: 'URL de descarga del reporte',
  })
  @Column({ nullable: true })
  downloadUrl?: string;

  @ApiProperty({
    example: 1024,
    description: 'Tamaño del reporte en bytes',
  })
  @Column({ default: 0 })
  size: number;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de generación del reporte',
  })
  @CreateDateColumn()
  generatedAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de creación del registro',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de última actualización del registro',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
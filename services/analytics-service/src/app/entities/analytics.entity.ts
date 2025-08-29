import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum EventType {
  USER_LOGIN = 'user_login',
  USER_REGISTER = 'user_register',
  DOG_CREATE = 'dog_create',
  DOG_UPDATE = 'dog_update',
  DOG_DELETE = 'dog_delete',
  SIGHTING_CREATE = 'sighting_create',
  SIGHTING_UPDATE = 'sighting_update',
  SIGHTING_DELETE = 'sighting_delete',
  MATCH_CREATE = 'match_create',
  MATCH_UPDATE = 'match_update',
  MESSAGE_SEND = 'message_send',
  NOTIFICATION_READ = 'notification_read',
  PROFILE_UPDATE = 'profile_update',
  SEARCH_PERFORM = 'search_perform',
  REPORT_GENERATE = 'report_generate',
  FILE_UPLOAD = 'file_upload',
}

@Entity('analytics_events')
export class AnalyticsEvent {
  @ApiProperty({
    example: 'uuid-generated-id',
    description: 'ID único del evento',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'uuid-user-id',
    description: 'ID del usuario que generó el evento',
  })
  @Column()
  @Index()
  userId: string;

  @ApiProperty({
    example: 'dog_create',
    enum: EventType,
    description: 'Tipo de evento',
  })
  @Column({
    type: 'enum',
    enum: EventType,
  })
  @Index()
  eventType: EventType;

  @ApiPropertyOptional({
    example: 'uuid-dog-id',
    description: 'ID de la entidad relacionada',
  })
  @Column({ nullable: true })
  @Index()
  entityId?: string;

  @ApiPropertyOptional({
    example: { breed: 'Golden Retriever', size: 'medium' },
    description: 'Datos adicionales del evento',
  })
  @Column({ type: 'json', nullable: true })
  metadata?: any;

  @ApiPropertyOptional({
    example: '192.168.1.1',
    description: 'Dirección IP del usuario',
  })
  @Column({ nullable: true })
  ipAddress?: string;

  @ApiPropertyOptional({
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    description: 'User agent del navegador',
  })
  @Column({ nullable: true })
  userAgent?: string;

  @ApiPropertyOptional({
    example: 'web',
    description: 'Plataforma desde la que se generó el evento',
  })
  @Column({ nullable: true })
  platform?: string;

  @ApiPropertyOptional({
    example: 'Mexico City',
    description: 'Ubicación geográfica del usuario',
  })
  @Column({ nullable: true })
  location?: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha y hora del evento',
  })
  @CreateDateColumn()
  @Index()
  timestamp: Date;

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
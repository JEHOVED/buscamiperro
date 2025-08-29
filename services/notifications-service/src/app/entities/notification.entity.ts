import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  MATCH = 'match',
  SIGHTING = 'sighting',
  MESSAGE = 'message',
  SYSTEM = 'system',
}

@Entity('notifications')
export class Notification {
  @ApiProperty({
    example: 'uuid-generated-id',
    description: 'ID único de la notificación',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'uuid-user-id',
    description: 'ID del usuario destinatario',
  })
  @Column()
  @Index()
  userId: string;

  @ApiProperty({
    example: 'Nuevo avistamiento reportado',
    description: 'Título de la notificación',
  })
  @Column()
  title: string;

  @ApiProperty({
    example: 'Alguien ha reportado un avistamiento de tu perro Firulais',
    description: 'Mensaje de la notificación',
  })
  @Column({ type: 'text' })
  message: string;

  @ApiProperty({
    example: 'sighting',
    enum: NotificationType,
    description: 'Tipo de notificación',
  })
  @Column({
    type: 'enum',
    enum: NotificationType,
    default: NotificationType.INFO,
  })
  type: NotificationType;

  @ApiPropertyOptional({
    example: 'uuid-dog-id',
    description: 'ID relacionado (perro, avistamiento, etc.)',
  })
  @Column({ nullable: true })
  relatedId?: string;

  @ApiPropertyOptional({
    example: { dogName: 'Firulais', sightingLocation: 'Parque Central' },
    description: 'Datos adicionales de la notificación',
  })
  @Column({ type: 'json', nullable: true })
  data?: any;

  @ApiProperty({
    example: false,
    description: 'Indica si la notificación ha sido leída',
  })
  @Column({ default: false })
  isRead: boolean;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de creación de la notificación',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de última actualización de la notificación',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
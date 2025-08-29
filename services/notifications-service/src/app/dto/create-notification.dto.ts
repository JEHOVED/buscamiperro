import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsEnum, IsObject } from 'class-validator';
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

export class CreateNotificationDto {
  @ApiProperty({
    example: 'Nuevo avistamiento reportado',
    description: 'Título de la notificación',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Alguien ha reportado un avistamiento de tu perro Firulais',
    description: 'Mensaje de la notificación',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    example: 'sighting',
    enum: NotificationType,
    description: 'Tipo de notificación',
  })
  @IsEnum(NotificationType)
  @IsNotEmpty()
  type: NotificationType;

  @ApiPropertyOptional({
    example: 'uuid-user-id',
    description: 'ID del usuario destinatario (opcional, se obtiene del token)',
  })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    example: 'uuid-dog-id',
    description: 'ID relacionado (perro, avistamiento, etc.)',
  })
  @IsString()
  @IsOptional()
  relatedId?: string;

  @ApiPropertyOptional({
    example: { dogName: 'Firulais', sightingLocation: 'Parque Central' },
    description: 'Datos adicionales de la notificación',
  })
  @IsObject()
  @IsOptional()
  data?: any;

  @ApiPropertyOptional({
    example: false,
    description: 'Indica si la notificación ha sido leída',
  })
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
}
import { IsString, IsOptional, IsBoolean, IsEnum, IsObject } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationType } from './create-notification.dto';

export class UpdateNotificationDto {
  @ApiPropertyOptional({
    example: 'Nuevo avistamiento reportado - Actualizado',
    description: 'Título actualizado de la notificación',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    example: 'Alguien ha reportado un avistamiento de tu perro Firulais. Por favor, revisa los detalles.',
    description: 'Mensaje actualizado de la notificación',
  })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiPropertyOptional({
    example: 'match',
    enum: NotificationType,
    description: 'Tipo actualizado de notificación',
  })
  @IsEnum(NotificationType)
  @IsOptional()
  type?: NotificationType;

  @ApiPropertyOptional({
    example: { dogName: 'Firulais', sightingLocation: 'Parque Central', contactInfo: 'juana@example.com' },
    description: 'Datos adicionales actualizados de la notificación',
  })
  @IsObject()
  @IsOptional()
  data?: any;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si la notificación ha sido leída',
  })
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
}
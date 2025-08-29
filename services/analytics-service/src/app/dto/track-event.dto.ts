import { IsString, IsNotEmpty, IsOptional, IsObject, IsEnum } from 'class-validator';
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

export class TrackEventDto {
  @ApiProperty({
    example: 'dog_create',
    enum: EventType,
    description: 'Tipo de evento',
  })
  @IsEnum(EventType)
  @IsNotEmpty()
  eventType: EventType;

  @ApiPropertyOptional({
    example: 'uuid-dog-id',
    description: 'ID de la entidad relacionada',
  })
  @IsString()
  @IsOptional()
  entityId?: string;

  @ApiPropertyOptional({
    example: { breed: 'Golden Retriever', size: 'medium' },
    description: 'Datos adicionales del evento',
  })
  @IsObject()
  @IsOptional()
  metadata?: any;

  @ApiPropertyOptional({
    example: 'uuid-user-id',
    description: 'ID del usuario que generó el evento (opcional, se obtiene del token)',
  })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    example: '192.168.1.1',
    description: 'Dirección IP del usuario',
  })
  @IsString()
  @IsOptional()
  ipAddress?: string;

  @ApiPropertyOptional({
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    description: 'User agent del navegador',
  })
  @IsString()
  @IsOptional()
  userAgent?: string;
}
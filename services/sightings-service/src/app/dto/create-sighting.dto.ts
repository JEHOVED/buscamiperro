import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, IsDateString, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum SightingStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export class LocationDto {
  @ApiProperty({
    example: -99.1332,
    description: 'Longitud (coordenada GPS)',
  })
  @IsNumber()
  longitude: number;

  @ApiProperty({
    example: 19.4326,
    description: 'Latitud (coordenada GPS)',
  })
  @IsNumber()
  latitude: number;

  @ApiPropertyOptional({
    example: 'Ciudad de México, México',
    description: 'Dirección legible del lugar',
  })
  @IsString()
  @IsOptional()
  address?: string;
}

export class CreateSightingDto {
  @ApiProperty({
    example: 'uuid-dog-id',
    description: 'ID del perro avistado',
  })
  @IsString()
  @IsNotEmpty()
  dogId: string;

  @ApiProperty({
    example: '2023-05-15T14:30:00Z',
    description: 'Fecha y hora del avistamiento',
  })
  @IsDateString()
  @IsNotEmpty()
  dateTime: string;

  @ApiProperty({
    type: LocationDto,
    description: 'Ubicación del avistamiento',
  })
  @ValidateNested()
  @Type(() => LocationDto)
  @IsNotEmpty()
  location: LocationDto;

  @ApiPropertyOptional({
    example: 'El perro estaba solo y parecía perdido',
    description: 'Descripción del estado del perro',
  })
  @IsString()
  @IsOptional()
  dogCondition?: string;

  @ApiPropertyOptional({
    example: 'Llevaba un collar rojo y estaba muy asustado',
    description: 'Detalles adicionales del avistamiento',
  })
  @IsString()
  @IsOptional()
  additionalDetails?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si el usuario desea ser contactado',
  })
  @IsBoolean()
  @IsOptional()
  contactRequested?: boolean;
}
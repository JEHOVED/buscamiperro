import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MatchStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
  CONTACTED = 'contacted',
}

export class CreateMatchDto {
  @ApiProperty({
    example: 'uuid-dog-id',
    description: 'ID del perro perdido',
  })
  @IsString()
  @IsNotEmpty()
  dogId: string;

  @ApiProperty({
    example: 'uuid-sighting-id',
    description: 'ID del avistamiento',
  })
  @IsString()
  @IsNotEmpty()
  sightingId: string;

  @ApiPropertyOptional({
    example: 0.85,
    description: 'Puntaje de coincidencia (0.0 - 1.0)',
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  matchScore?: number;

  @ApiPropertyOptional({
    example: 'Coincidencia basada en ubicación y descripción',
    description: 'Razón de la coincidencia',
  })
  @IsString()
  @IsOptional()
  reason?: string;
}
import { IsString, IsOptional, IsEnum, IsNumber, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SightingStatus, LocationDto } from './create-sighting.dto';

export class UpdateSightingDto {
  @ApiPropertyOptional({
    example: 'verified',
    enum: SightingStatus,
    description: 'Estado del avistamiento',
  })
  @IsEnum(SightingStatus)
  @IsOptional()
  status?: SightingStatus;

  @ApiPropertyOptional({
    type: LocationDto,
    description: 'Ubicación del avistamiento',
  })
  @ValidateNested()
  @Type(() => LocationDto)
  @IsOptional()
  location?: LocationDto;

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
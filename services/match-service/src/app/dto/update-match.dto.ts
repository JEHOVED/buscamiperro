import { IsString, IsOptional, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { MatchStatus } from './create-match.dto';

export class UpdateMatchDto {
  @ApiPropertyOptional({
    example: 'confirmed',
    enum: MatchStatus,
    description: 'Estado de la coincidencia',
  })
  @IsEnum(MatchStatus)
  @IsOptional()
  status?: MatchStatus;

  @ApiPropertyOptional({
    example: 0.95,
    description: 'Puntaje de coincidencia actualizado (0.0 - 1.0)',
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  matchScore?: number;

  @ApiPropertyOptional({
    example: 'Usuario confirmó la coincidencia',
    description: 'Notas adicionales sobre la coincidencia',
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
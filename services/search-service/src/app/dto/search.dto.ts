import { IsString, IsNotEmpty, IsOptional, IsNumber, IsObject, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({
    example: 'perro perdido',
    description: 'Texto de búsqueda',
  })
  @IsString()
  @IsNotEmpty()
  query: string;

  @ApiPropertyOptional({
    example: 'dog',
    description: 'Tipo de entidad a buscar',
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Número de página',
  })
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Límite de resultados por página',
  })
  @IsNumber()
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({
    example: { breed: 'Golden Retriever', size: 'medium' },
    description: 'Filtros adicionales',
  })
  @IsObject()
  @IsOptional()
  filters?: any;

  @ApiPropertyOptional({
    example: ['name', 'description'],
    description: 'Campos en los que buscar',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  searchFields?: string[];

  @ApiPropertyOptional({
    example: 'name:asc',
    description: 'Orden de los resultados',
  })
  @IsString()
  @IsOptional()
  sort?: string;
}
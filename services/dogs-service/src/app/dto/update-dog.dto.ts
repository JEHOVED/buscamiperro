import { IsString, IsOptional, IsEnum, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { DogSize, DogGender, LocationDto } from './create-dog.dto';

export class UpdateDogDto {
  @ApiPropertyOptional({
    example: 'Firulais',
    description: 'Nombre del perro',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'Golden Retriever',
    description: 'Raza del perro',
  })
  @IsString()
  @IsOptional()
  breed?: string;

  @ApiPropertyOptional({
    example: 'medium',
    enum: DogSize,
    description: 'Tamaño del perro',
  })
  @IsEnum(DogSize)
  @IsOptional()
  size?: DogSize;

  @ApiPropertyOptional({
    example: 'golden',
    description: 'Color principal del perro',
  })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({
    example: 'Blanco con manchas doradas',
    description: 'Colores secundarios o patrones',
  })
  @IsString()
  @IsOptional()
  secondaryColor?: string;

  @ApiPropertyOptional({
    example: 'male',
    enum: DogGender,
    description: 'Género del perro',
  })
  @IsEnum(DogGender)
  @IsOptional()
  gender?: DogGender;

  @ApiPropertyOptional({
    type: LocationDto,
    description: 'Ubicación donde se perdió el perro',
  })
  @ValidateNested()
  @Type(() => LocationDto)
  @IsOptional()
  locationLost?: LocationDto;

  @ApiPropertyOptional({
    example: 'Tiene una cicatriz en la oreja izquierda',
    description: 'Características especiales o marcas distintivas',
  })
  @IsString()
  @IsOptional()
  distinctiveFeatures?: string;

  @ApiPropertyOptional({
    example: 'Muy amigable y juguetón',
    description: 'Comportamiento del perro',
  })
  @IsString()
  @IsOptional()
  behavior?: string;

  @ApiPropertyOptional({
    example: 'Lleva un collar rojo',
    description: 'Accesorios que lleva el perro',
  })
  @IsString()
  @IsOptional()
  accessories?: string;
}
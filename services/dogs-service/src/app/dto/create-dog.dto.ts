import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum DogStatus {
  LOST = 'lost',
  FOUND = 'found',
  REUNITED = 'reunited',
}

export enum DogSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra_large',
}

export enum DogGender {
  MALE = 'male',
  FEMALE = 'female',
  UNKNOWN = 'unknown',
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

export class CreateDogDto {
  @ApiProperty({
    example: 'Firulais',
    description: 'Nombre del perro',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Golden Retriever',
    description: 'Raza del perro',
  })
  @IsString()
  @IsNotEmpty()
  breed: string;

  @ApiProperty({
    example: 'medium',
    enum: DogSize,
    description: 'Tamaño del perro',
  })
  @IsEnum(DogSize)
  @IsNotEmpty()
  size: DogSize;

  @ApiProperty({
    example: 'golden',
    description: 'Color principal del perro',
  })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiPropertyOptional({
    example: 'Blanco con manchas doradas',
    description: 'Colores secundarios o patrones',
  })
  @IsString()
  @IsOptional()
  secondaryColor?: string;

  @ApiProperty({
    example: 'male',
    enum: DogGender,
    description: 'Género del perro',
  })
  @IsEnum(DogGender)
  @IsNotEmpty()
  gender: DogGender;

  @ApiProperty({
    example: '2023-05-15',
    description: 'Fecha cuando se perdió el perro',
  })
  @IsDateString()
  @IsNotEmpty()
  dateLost: string;

  @ApiProperty({
    type: LocationDto,
    description: 'Ubicación donde se perdió el perro',
  })
  @ValidateNested()
  @Type(() => LocationDto)
  @IsNotEmpty()
  locationLost: LocationDto;

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
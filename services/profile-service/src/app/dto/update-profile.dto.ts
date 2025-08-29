import { IsString, IsOptional, IsEmail, IsPhoneNumber, IsUrl, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiPropertyOptional({
    example: 'juan.perez@example.com',
    description: 'Email de contacto',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: '+521234567890',
    description: 'Número de teléfono',
  })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    example: 'Ciudad de México, México',
    description: 'Ubicación del usuario',
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/profile.jpg',
    description: 'URL de la imagen de perfil',
  })
  @IsUrl()
  @IsOptional()
  avatarUrl?: string;

  @ApiPropertyOptional({
    example: 'Amante de los perros y voluntario en refugios',
    description: 'Biografía del usuario',
  })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si el usuario desea recibir notificaciones',
  })
  @IsBoolean()
  @IsOptional()
  notificationsEnabled?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Indica si el perfil es público',
  })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
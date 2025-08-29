import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Email del usuario',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'ContraseñaSegura123',
    description: 'Contraseña del usuario',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
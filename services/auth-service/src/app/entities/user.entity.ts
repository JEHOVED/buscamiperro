import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({
    example: 'uuid-generated-id',
    description: 'ID único del usuario',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Email del usuario',
  })
  @Column({ unique: true })
  @Index()
  email: string;

  @ApiProperty({
    example: 'ContraseñaHasheada123',
    description: 'Contraseña hasheada del usuario',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  @Column()
  displayName: string;

  @ApiProperty({
    example: '+521234567890',
    description: 'Número de teléfono del usuario',
  })
  @Column({ nullable: true })
  phoneNumber?: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'URL del avatar del usuario',
  })
  @Column({ nullable: true })
  avatarUrl?: string;

  @ApiProperty({
    example: true,
    description: 'Indica si el email ha sido verificado',
  })
  @Column({ default: false })
  isEmailVerified: boolean;

  @ApiProperty({
    example: 'google-oauth-id',
    description: 'ID de Google para OAuth',
  })
  @Column({ nullable: true })
  googleId?: string;

  @ApiProperty({
    example: 'facebook-oauth-id',
    description: 'ID de Facebook para OAuth',
  })
  @Column({ nullable: true })
  facebookId?: string;

  @ApiProperty({
    example: 'refresh-token-uuid',
    description: 'Refresh token actual del usuario',
  })
  @Column({ nullable: true })
  refreshToken?: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de creación del usuario',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de última actualización del usuario',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('profiles')
export class Profile {
  @ApiProperty({
    example: 'uuid-generated-id',
    description: 'ID único del perfil',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'uuid-user-id',
    description: 'ID del usuario asociado',
  })
  @Column()
  @Index({ unique: true })
  userId: string;

  @ApiPropertyOptional({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  @Column({ nullable: true })
  fullName?: string;

  @ApiPropertyOptional({
    example: 'juan.perez@example.com',
    description: 'Email de contacto',
  })
  @Column({ nullable: true })
  email?: string;

  @ApiPropertyOptional({
    example: '+521234567890',
    description: 'Número de teléfono',
  })
  @Column({ nullable: true })
  phone?: string;

  @ApiPropertyOptional({
    example: 'Ciudad de México, México',
    description: 'Ubicación del usuario',
  })
  @Column({ nullable: true })
  location?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/profile.jpg',
    description: 'URL de la imagen de perfil',
  })
  @Column({ nullable: true })
  avatarUrl?: string;

  @ApiPropertyOptional({
    example: 'Amante de los perros y voluntario en refugios',
    description: 'Biografía del usuario',
  })
  @Column({ type: 'text', nullable: true })
  bio?: string;

  @ApiProperty({
    example: true,
    description: 'Indica si el usuario desea recibir notificaciones',
  })
  @Column({ default: true })
  notificationsEnabled: boolean;

  @ApiProperty({
    example: false,
    description: 'Indica si el perfil es público',
  })
  @Column({ default: false })
  isPublic: boolean;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de creación del perfil',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de última actualización del perfil',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
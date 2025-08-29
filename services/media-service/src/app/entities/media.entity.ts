import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
}

@Entity('media_files')
export class MediaFile {
  @ApiProperty({
    example: 'uuid-generated-id',
    description: 'ID único del archivo',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'uuid-user-id',
    description: 'ID del usuario que subió el archivo',
  })
  @Column()
  @Index()
  userId: string;

  @ApiProperty({
    example: 'perro-perdido.jpg',
    description: 'Nombre original del archivo',
  })
  @Column()
  filename: string;

  @ApiProperty({
    example: 'image/jpeg',
    description: 'Tipo MIME del archivo',
  })
  @Column()
  mimeType: string;

  @ApiProperty({
    example: 1024000,
    description: 'Tamaño del archivo en bytes',
  })
  @Column()
  size: number;

  @ApiProperty({
    example: 'images/perro-perdido.jpg',
    description: 'Ruta al archivo en el sistema de almacenamiento',
  })
  @Column()
  filePath: string;

  @ApiProperty({
    example: 'image',
    enum: MediaType,
    description: 'Tipo de medio',
  })
  @Column({
    type: 'enum',
    enum: MediaType,
    default: MediaType.IMAGE,
  })
  @Index()
  mediaType: MediaType;

  @ApiProperty({
    example: true,
    description: 'Indica si el archivo tiene miniatura',
  })
  @Column({ default: false })
  hasThumbnail: boolean;

  @ApiProperty({
    example: false,
    description: 'Indica si el archivo es público',
  })
  @Column({ default: false })
  @Index()
  isPublic: boolean;

  @ApiPropertyOptional({
    example: 'uuid-dog-id',
    description: 'ID relacionado (perro, avistamiento, etc.)',
  })
  @Column({ nullable: true })
  @Index()
  relatedId?: string;

  @ApiPropertyOptional({
    example: 'Imagen del perro perdido Firulais',
    description: 'Descripción del archivo',
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de subida del archivo',
  })
  @CreateDateColumn()
  uploadedAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de creación del registro',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de última actualización del registro',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
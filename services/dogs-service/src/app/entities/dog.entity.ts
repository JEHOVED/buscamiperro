import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
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

@Entity('dogs')
export class Dog {
  @ApiProperty({
    example: 'uuid-generated-id',
    description: 'ID único del perro',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'uuid-user-id',
    description: 'ID del usuario dueño del perro',
  })
  @Column()
  @Index()
  userId: string;

  @ApiProperty({
    example: 'Firulais',
    description: 'Nombre del perro',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Golden Retriever',
    description: 'Raza del perro',
  })
  @Column()
  breed: string;

  @ApiProperty({
    example: 'medium',
    enum: DogSize,
    description: 'Tamaño del perro',
  })
  @Column({
    type: 'enum',
    enum: DogSize,
    default: DogSize.MEDIUM,
  })
  size: DogSize;

  @ApiProperty({
    example: 'golden',
    description: 'Color principal del perro',
  })
  @Column()
  color: string;

  @ApiPropertyOptional({
    example: 'Blanco con manchas doradas',
    description: 'Colores secundarios o patrones',
  })
  @Column({ nullable: true })
  secondaryColor?: string;

  @ApiProperty({
    example: 'male',
    enum: DogGender,
    description: 'Género del perro',
  })
  @Column({
    type: 'enum',
    enum: DogGender,
    default: DogGender.UNKNOWN,
  })
  gender: DogGender;

  @ApiProperty({
    example: '2023-05-15',
    description: 'Fecha cuando se perdió el perro',
  })
  @Column({ type: 'date' })
  dateLost: string;

  @ApiProperty({
    example: -99.1332,
    description: 'Longitud donde se perdió el perro',
  })
  @Column({ type: 'decimal', precision: 10, scale: 8 })
  longitude: number;

  @ApiProperty({
    example: 19.4326,
    description: 'Latitud donde se perdió el perro',
  })
  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @ApiPropertyOptional({
    example: 'Ciudad de México, México',
    description: 'Dirección legible del lugar donde se perdió',
  })
  @Column({ nullable: true })
  locationAddress?: string;

  @ApiPropertyOptional({
    example: 'Tiene una cicatriz en la oreja izquierda',
    description: 'Características especiales o marcas distintivas',
  })
  @Column({ nullable: true })
  distinctiveFeatures?: string;

  @ApiPropertyOptional({
    example: 'Muy amigable y juguetón',
    description: 'Comportamiento del perro',
  })
  @Column({ nullable: true })
  behavior?: string;

  @ApiPropertyOptional({
    example: 'Lleva un collar rojo',
    description: 'Accesorios que lleva el perro',
  })
  @Column({ nullable: true })
  accessories?: string;

  @ApiProperty({
    example: 'lost',
    enum: DogStatus,
    description: 'Estado actual del perro',
  })
  @Column({
    type: 'enum',
    enum: DogStatus,
    default: DogStatus.LOST,
  })
  status: DogStatus;

  @ApiPropertyOptional({
    example: 'https://example.com/dog-image.jpg',
    description: 'URL de la imagen principal del perro',
  })
  @Column({ nullable: true })
  imageUrl?: string;

  @ApiPropertyOptional({
    example: ['https://example.com/dog-image1.jpg', 'https://example.com/dog-image2.jpg'],
    description: 'URLs de imágenes adicionales del perro',
  })
  @Column({ type: 'json', nullable: true })
  additionalImages?: string[];

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
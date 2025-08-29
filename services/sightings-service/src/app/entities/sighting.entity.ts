import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum SightingStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

@Entity('sightings')
export class Sighting {
  @ApiProperty({
    example: 'uuid-generated-id',
    description: 'ID único del avistamiento',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'uuid-dog-id',
    description: 'ID del perro avistado',
  })
  @Column()
  @Index()
  dogId: string;

  @ApiProperty({
    example: 'uuid-user-id',
    description: 'ID del usuario que reportó el avistamiento',
  })
  @Column()
  @Index()
  userId: string;

  @ApiProperty({
    example: '2023-05-15T14:30:00Z',
    description: 'Fecha y hora del avistamiento',
  })
  @Column({ type: 'timestamp' })
  dateTime: Date;

  @ApiProperty({
    example: -99.1332,
    description: 'Longitud del avistamiento',
  })
  @Column({ type: 'decimal', precision: 10, scale: 8 })
  longitude: number;

  @ApiProperty({
    example: 19.4326,
    description: 'Latitud del avistamiento',
  })
  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @ApiPropertyOptional({
    example: 'Ciudad de México, México',
    description: 'Dirección legible del lugar del avistamiento',
  })
  @Column({ nullable: true })
  locationAddress?: string;

  @ApiPropertyOptional({
    example: 'El perro estaba solo y parecía perdido',
    description: 'Descripción del estado del perro',
  })
  @Column({ nullable: true })
  dogCondition?: string;

  @ApiPropertyOptional({
    example: 'Llevaba un collar rojo y estaba muy asustado',
    description: 'Detalles adicionales del avistamiento',
  })
  @Column({ nullable: true })
  additionalDetails?: string;

  @ApiProperty({
    example: 'pending',
    enum: SightingStatus,
    description: 'Estado del avistamiento',
  })
  @Column({
    type: 'enum',
    enum: SightingStatus,
    default: SightingStatus.PENDING,
  })
  status: SightingStatus;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si el usuario desea ser contactado',
  })
  @Column({ default: false })
  contactRequested: boolean;

  @ApiPropertyOptional({
    example: 'https://example.com/sighting-image.jpg',
    description: 'URL de la imagen del avistamiento',
  })
  @Column({ nullable: true })
  imageUrl?: string;

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
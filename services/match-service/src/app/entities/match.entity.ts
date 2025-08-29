import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MatchStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
  CONTACTED = 'contacted',
}

@Entity('matches')
export class Match {
  @ApiProperty({
    example: 'uuid-generated-id',
    description: 'ID único de la coincidencia',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'uuid-dog-id',
    description: 'ID del perro perdido',
  })
  @Column()
  @Index()
  dogId: string;

  @ApiProperty({
    example: 'uuid-sighting-id',
    description: 'ID del avistamiento',
  })
  @Column()
  @Index()
  sightingId: string;

  @ApiProperty({
    example: 'uuid-user-id',
    description: 'ID del usuario que creó la coincidencia',
  })
  @Column()
  @Index()
  userId: string;

  @ApiProperty({
    example: 'pending',
    enum: MatchStatus,
    description: 'Estado de la coincidencia',
  })
  @Column({
    type: 'enum',
    enum: MatchStatus,
    default: MatchStatus.PENDING,
  })
  status: MatchStatus;

  @ApiPropertyOptional({
    example: 0.85,
    description: 'Puntaje de coincidencia (0.0 - 1.0)',
  })
  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  matchScore?: number;

  @ApiPropertyOptional({
    example: 'Coincidencia basada en ubicación y descripción',
    description: 'Razón de la coincidencia',
  })
  @Column({ nullable: true })
  reason?: string;

  @ApiPropertyOptional({
    example: 'Usuario confirmó la coincidencia',
    description: 'Notas adicionales sobre la coincidencia',
  })
  @Column({ nullable: true })
  notes?: string;

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
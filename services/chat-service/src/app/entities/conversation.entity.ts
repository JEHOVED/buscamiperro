import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('conversations')
export class Conversation {
  @ApiProperty({
    example: 'uuid-generated-id',
    description: 'ID único de la conversación',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'uuid-user-id-1,uuid-user-id-2',
    description: 'IDs de los participantes en la conversación',
    type: [String],
  })
  @Column({ type: 'json' })
  participantIds: string[];

  @ApiProperty({
    example: 'uuid-user-id',
    description: 'ID del usuario que creó la conversación',
  })
  @Column()
  @Index()
  creatorId: string;

  @ApiPropertyOptional({
    example: 'Reunión sobre Firulais',
    description: 'Nombre de la conversación',
  })
  @Column({ nullable: true })
  name?: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de la última actividad en la conversación',
  })
  @UpdateDateColumn()
  lastActivityAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de creación de la conversación',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de última actualización de la conversación',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
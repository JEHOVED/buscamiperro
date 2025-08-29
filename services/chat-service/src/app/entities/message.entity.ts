import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  LOCATION = 'location',
}

@Entity('messages')
export class Message {
  @ApiProperty({
    example: 'uuid-generated-id',
    description: 'ID único del mensaje',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'uuid-conversation-id',
    description: 'ID de la conversación',
  })
  @Column()
  @Index()
  conversationId: string;

  @ApiProperty({
    example: 'uuid-user-id',
    description: 'ID del usuario que envía el mensaje',
  })
  @Column()
  @Index()
  senderId: string;

  @ApiProperty({
    example: 'Hola, ¿has visto a mi perro?',
    description: 'Contenido del mensaje',
  })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({
    example: 'text',
    enum: MessageType,
    description: 'Tipo de mensaje',
  })
  @Column({
    type: 'enum',
    enum: MessageType,
    default: MessageType.TEXT,
  })
  messageType: MessageType;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'URL del archivo adjunto (imagen, etc.)',
  })
  @Column({ nullable: true })
  attachmentUrl?: string;

  @ApiProperty({
    example: false,
    description: 'Indica si el mensaje ha sido leído',
  })
  @Column({ default: false })
  isRead: boolean;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de creación del mensaje',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Fecha de última actualización del mensaje',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
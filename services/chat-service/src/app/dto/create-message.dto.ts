import { IsString, IsNotEmpty, IsArray, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    example: 'uuid-conversation-id',
    description: 'ID de la conversación',
  })
  @IsString()
  @IsNotEmpty()
  conversationId: string;

  @ApiProperty({
    example: 'uuid-user-id',
    description: 'ID del usuario que envía el mensaje',
  })
  @IsString()
  @IsNotEmpty()
  senderId: string;

  @ApiProperty({
    example: 'Hola, ¿has visto a mi perro?',
    description: 'Contenido del mensaje',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    example: 'text',
    description: 'Tipo de mensaje',
  })
  @IsString()
  @IsOptional()
  messageType?: string;
}
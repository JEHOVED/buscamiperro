import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateConversationDto {
  @ApiProperty({
    example: 'uuid-user-id-1,uuid-user-id-2',
    description: 'IDs de los participantes en la conversación',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  participantIds: string[];

  @ApiPropertyOptional({
    example: 'Reunión sobre Firulais',
    description: 'Nombre de la conversación',
  })
  @IsString()
  @IsOptional()
  name?: string;
}
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { MessagesRepository } from './repositories/messages.repository';
import { ConversationsRepository } from './repositories/conversations.repository';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Message } from './entities/message.entity';
import { Conversation } from './entities/conversation.entity';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly conversationsRepository: ConversationsRepository,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<any> {
    try {
      // Verificar que la conversación exista
      const conversation = await this.conversationsRepository.findById(createMessageDto.conversationId);
      if (!conversation) {
        throw new NotFoundException('Conversación no encontrada');
      }
      
      // Verificar que el usuario sea parte de la conversación
      if (!conversation.participantIds.includes(createMessageDto.senderId)) {
        throw new BadRequestException('Usuario no autorizado para enviar mensajes en esta conversación');
      }
      
      const message = new Message();
      Object.assign(message, createMessageDto);
      
      const savedMessage = await this.messagesRepository.create(message);
      
      // Actualizar la última actividad de la conversación
      await this.conversationsRepository.updateLastActivity(createMessageDto.conversationId);
      
      return {
        success: true,
        message: 'Mensaje enviado exitosamente',
        data: savedMessage,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al enviar el mensaje');
    }
  }

  async findByConversation(conversationId: string, page: number = 1, limit: number = 20, userId: string): Promise<any> {
    try {
      // Verificar que la conversación exista
      const conversation = await this.conversationsRepository.findById(conversationId);
      if (!conversation) {
        throw new NotFoundException('Conversación no encontrada');
      }
      
      // Verificar que el usuario sea parte de la conversación
      if (!conversation.participantIds.includes(userId)) {
        throw new BadRequestException('Usuario no autorizado para acceder a esta conversación');
      }
      
      const [messages, total] = await this.messagesRepository.findByConversation(conversationId, page, limit);
      
      // Marcar mensajes como leídos para este usuario
      await this.messagesRepository.markAsRead(conversationId, userId);
      
      return {
        success: true,
        data: messages,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new Error('Error al obtener los mensajes');
    }
  }

  async findUnread(userId: string): Promise<any> {
    try {
      const messages = await this.messagesRepository.findUnread(userId);
      
      return {
        success: true,
        data: messages,
      };
    } catch (error) {
      throw new Error('Error al obtener los mensajes no leídos');
    }
  }

  async createConversation(createConversationDto: CreateConversationDto, userId: string): Promise<any> {
    try {
      // Verificar que todos los participantes existan (esto se haría con una llamada al auth service)
      // Por ahora asumimos que los IDs son válidos
      
      // Asegurarse de que el creador esté en la lista de participantes
      if (!createConversationDto.participantIds.includes(userId)) {
        createConversationDto.participantIds.push(userId);
      }
      
      const conversation = new Conversation();
      Object.assign(conversation, createConversationDto);
      conversation.creatorId = userId;
      
      const savedConversation = await this.conversationsRepository.create(conversation);
      
      return {
        success: true,
        message: 'Conversación creada exitosamente',
        data: savedConversation,
      };
    } catch (error) {
      throw new BadRequestException('Error al crear la conversación');
    }
  }

  async findConversations(userId: string): Promise<any> {
    try {
      const conversations = await this.conversationsRepository.findByUser(userId);
      
      return {
        success: true,
        data: conversations,
      };
    } catch (error) {
      throw new Error('Error al obtener las conversaciones');
    }
  }

  async findConversation(conversationId: string, userId: string): Promise<any> {
    try {
      const conversation = await this.conversationsRepository.findById(conversationId);
      if (!conversation) {
        throw new NotFoundException('Conversación no encontrada');
      }
      
      // Verificar que el usuario sea parte de la conversación
      if (!conversation.participantIds.includes(userId)) {
        throw new BadRequestException('Usuario no autorizado para acceder a esta conversación');
      }
      
      return {
        success: true,
        data: conversation,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new Error('Error al obtener la conversación');
    }
  }

  async markAsRead(conversationId: string, userId: string): Promise<void> {
    await this.messagesRepository.markAsRead(conversationId, userId);
  }
}
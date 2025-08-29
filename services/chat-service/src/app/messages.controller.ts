import { Controller, Get, Post, Body, Param, Query, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Message } from './entities/message.entity';
import { Conversation } from './entities/conversation.entity';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Enviar un nuevo mensaje' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Mensaje enviado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createMessageDto: CreateMessageDto, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub; // Obtener ID del usuario del token JWT
      const result = await this.messagesService.create(createMessageDto);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get('conversation/:conversationId')
  @ApiOperation({ summary: 'Obtener mensajes de una conversación' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Lista de mensajes' })
  async findByConversation(
    @Param('conversationId') conversationId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.messagesService.findByConversation(conversationId, page, limit, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener los mensajes',
      });
    }
  }

  @Get('unread')
  @ApiOperation({ summary: 'Obtener mensajes no leídos del usuario' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Lista de mensajes no leídos' })
  async findUnread(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.messagesService.findUnread(userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener los mensajes no leídos',
      });
    }
  }

  @Post('conversations')
  @ApiOperation({ summary: 'Crear una nueva conversación' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Conversación creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async createConversation(@Body() createConversationDto: CreateConversationDto, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.messagesService.createConversation(createConversationDto, userId);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get('conversations')
  @ApiOperation({ summary: 'Obtener conversaciones del usuario' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Lista de conversaciones' })
  async findConversations(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.messagesService.findConversations(userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener las conversaciones',
      });
    }
  }

  @Get('conversations/:conversationId')
  @ApiOperation({ summary: 'Obtener detalles de una conversación' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Detalles de la conversación' })
  @ApiResponse({ status: 404, description: 'Conversación no encontrada' })
  async findConversation(@Param('conversationId') conversationId: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.messagesService.findConversation(conversationId, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Conversación no encontrada',
      });
    }
  }
}
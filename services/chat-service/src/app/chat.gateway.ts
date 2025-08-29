import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  afterInit(server: Server) {
    console.log('Chat Gateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinConversation')
  handleJoinConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.conversationId);
    client.emit('joinedConversation', { conversationId: data.conversationId });
  }

  @SubscribeMessage('leaveConversation')
  handleLeaveConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(data.conversationId);
    client.emit('leftConversation', { conversationId: data.conversationId });
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const message = await this.messagesService.create(createMessageDto);
      
      // Emitir el mensaje a todos los clientes en la conversación
      this.server.to(createMessageDto.conversationId).emit('newMessage', message);
      
      // También emitir una notificación a los participantes
      this.server.to(createMessageDto.conversationId).emit('messageNotification', {
        conversationId: createMessageDto.conversationId,
        senderId: createMessageDto.senderId,
        content: createMessageDto.content,
      });
      
      return { success: true, message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { conversationId: string, userId: string, isTyping: boolean },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(data.conversationId).emit('userTyping', {
      userId: data.userId,
      isTyping: data.isTyping,
    });
  }

  @SubscribeMessage('markAsRead')
  async handleMarkAsRead(
    @MessageBody() data: { conversationId: string, userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      await this.messagesService.markAsRead(data.conversationId, data.userId);
      
      // Notificar a otros usuarios en la conversación
      client.to(data.conversationId).emit('messagesRead', {
        conversationId: data.conversationId,
        userId: data.userId,
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
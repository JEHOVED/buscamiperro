import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { NotificationsRepository } from './repositories/notifications.repository';
import { WebPushService } from './services/web-push.service';
import { FirebaseService } from './services/firebase.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly webPushService: WebPushService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(createNotificationDto: CreateNotificationDto, userId: string): Promise<any> {
    try {
      const notification = new Notification();
      Object.assign(notification, createNotificationDto);
      notification.userId = userId;
      
      const savedNotification = await this.notificationsRepository.create(notification);
      
      return {
        success: true,
        message: 'Notificación creada exitosamente',
        data: savedNotification,
      };
    } catch (error) {
      throw new BadRequestException('Error al crear la notificación');
    }
  }

  async findAll(userId: string, page: number = 1, limit: number = 20, isRead?: boolean): Promise<any> {
    try {
      const [notifications, total] = await this.notificationsRepository.findAll(userId, page, limit, isRead);
      
      return {
        success: true,
        data: notifications,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error('Error al obtener la lista de notificaciones');
    }
  }

  async findOne(id: string, userId: string): Promise<any> {
    try {
      const notification = await this.notificationsRepository.findById(id);
      if (!notification) {
        throw new NotFoundException('Notificación no encontrada');
      }
      
      // Verificar que la notificación pertenezca al usuario
      if (notification.userId !== userId) {
        throw new ForbiddenException('No autorizado');
      }
      
      return {
        success: true,
        data: notification,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error('Error al obtener la notificación');
    }
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto, userId: string): Promise<any> {
    try {
      const notification = await this.notificationsRepository.findById(id);
      if (!notification) {
        throw new NotFoundException('Notificación no encontrada');
      }
      
      // Verificar que la notificación pertenezca al usuario
      if (notification.userId !== userId) {
        throw new ForbiddenException('No autorizado');
      }
      
      const updatedNotification = await this.notificationsRepository.update(id, updateNotificationDto);
      
      return {
        success: true,
        message: 'Notificación actualizada exitosamente',
        data: updatedNotification,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException('Error al actualizar la notificación');
    }
  }

  async remove(id: string, userId: string): Promise<any> {
    try {
      const notification = await this.notificationsRepository.findById(id);
      if (!notification) {
        throw new NotFoundException('Notificación no encontrada');
      }
      
      // Verificar que la notificación pertenezca al usuario
      if (notification.userId !== userId) {
        throw new ForbiddenException('No autorizado');
      }
      
      await this.notificationsRepository.remove(id);
      
      return {
        success: true,
        message: 'Notificación eliminada exitosamente',
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error('Error al eliminar la notificación');
    }
  }

  async sendPushNotification(createNotificationDto: CreateNotificationDto, userId: string): Promise<any> {
    try {
      // Crear la notificación en la base de datos
      const notification = new Notification();
      Object.assign(notification, createNotificationDto);
      notification.userId = userId;
      
      const savedNotification = await this.notificationsRepository.create(notification);
      
      // Enviar notificación push
      await this.webPushService.sendNotification(userId, {
        title: createNotificationDto.title,
        body: createNotificationDto.message,
        data: createNotificationDto.data,
      });
      
      // Enviar notificación por Firebase (para móviles)
      await this.firebaseService.sendNotification(userId, {
        title: createNotificationDto.title,
        body: createNotificationDto.message,
        data: createNotificationDto.data,
      });
      
      return {
        success: true,
        message: 'Notificación push enviada exitosamente',
        data: savedNotification,
      };
    } catch (error) {
      throw new BadRequestException('Error al enviar la notificación push');
    }
  }

  async subscribeToPush(userId: string, subscription: any): Promise<any> {
    try {
      await this.webPushService.subscribeUser(userId, subscription);
      
      return {
        success: true,
        message: 'Dispositivo suscrito exitosamente',
      };
    } catch (error) {
      throw new BadRequestException('Error al suscribir el dispositivo');
    }
  }

  async unsubscribeFromPush(userId: string, subscription: any): Promise<any> {
    try {
      await this.webPushService.unsubscribeUser(userId, subscription);
      
      return {
        success: true,
        message: 'Suscripción cancelada exitosamente',
      };
    } catch (error) {
      throw new BadRequestException('Error al cancelar la suscripción');
    }
  }

  async markAsRead(id: string, userId: string): Promise<any> {
    try {
      const notification = await this.notificationsRepository.findById(id);
      if (!notification) {
        throw new NotFoundException('Notificación no encontrada');
      }
      
      // Verificar que la notificación pertenezca al usuario
      if (notification.userId !== userId) {
        throw new ForbiddenException('No autorizado');
      }
      
      const updatedNotification = await this.notificationsRepository.update(id, { isRead: true });
      
      return {
        success: true,
        message: 'Notificación marcada como leída',
        data: updatedNotification,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error('Error al marcar la notificación como leída');
    }
  }

  async markAllAsRead(userId: string): Promise<any> {
    try {
      await this.notificationsRepository.markAllAsRead(userId);
      
      return {
        success: true,
        message: 'Todas las notificaciones marcadas como leídas',
      };
    } catch (error) {
      throw new Error('Error al marcar notificaciones como leídas');
    }
  }
}
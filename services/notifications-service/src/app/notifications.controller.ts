import { Controller, Post, Get, Put, Delete, Body, Param, Query, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva notificación' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Notificación creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createNotificationDto: CreateNotificationDto, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub; // Obtener ID del usuario del token JWT
      const result = await this.notificationsService.create(createNotificationDto, userId);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de notificaciones del usuario' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'isRead', required: false, type: Boolean })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Lista de notificaciones' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('isRead') isRead?: boolean,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.notificationsService.findAll(userId, page, limit, isRead);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener la lista de notificaciones',
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalles de una notificación por ID' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Detalles de la notificación' })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada' })
  async findOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.notificationsService.findOne(id, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Notificación no encontrada',
      });
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar información de una notificación' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Notificación actualizada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.notificationsService.update(id, updateNotificationDto, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      if (error.message === 'No autorizado') {
        return res.status(HttpStatus.FORBIDDEN).json({
          success: false,
          message: 'No tienes permiso para actualizar esta notificación',
        });
      }
      if (error.message === 'Notificación no encontrada') {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Notificación no encontrada',
        });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una notificación' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Notificación eliminada exitosamente' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada' })
  async remove(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.notificationsService.remove(id, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      if (error.message === 'No autorizado') {
        return res.status(HttpStatus.FORBIDDEN).json({
          success: false,
          message: 'No tienes permiso para eliminar esta notificación',
        });
      }
      if (error.message === 'Notificación no encontrada') {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Notificación no encontrada',
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al eliminar la notificación',
      });
    }
  }

  @Post('send')
  @ApiOperation({ summary: 'Enviar una notificación push' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Notificación push enviada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async sendPushNotification(@Body() createNotificationDto: CreateNotificationDto, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.notificationsService.sendPushNotification(createNotificationDto, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Post('subscribe')
  @ApiOperation({ summary: 'Suscribir dispositivo para notificaciones push' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Dispositivo suscrito exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async subscribeToPush(
    @Body() subscription: any,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.notificationsService.subscribeToPush(userId, subscription);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Post('unsubscribe')
  @ApiOperation({ summary: 'Cancelar suscripción de dispositivo para notificaciones push' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Suscripción cancelada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async unsubscribeFromPush(
    @Body() subscription: any,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.notificationsService.unsubscribeFromPush(userId, subscription);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Put('mark-as-read/:id')
  @ApiOperation({ summary: 'Marcar notificación como leída' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Notificación marcada como leída' })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada' })
  async markAsRead(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.notificationsService.markAsRead(id, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Notificación no encontrada',
      });
    }
  }

  @Put('mark-all-as-read')
  @ApiOperation({ summary: 'Marcar todas las notificaciones como leídas' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Todas las notificaciones marcadas como leídas' })
  async markAllAsRead(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.notificationsService.markAllAsRead(userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al marcar notificaciones como leídas',
      });
    }
  }
}
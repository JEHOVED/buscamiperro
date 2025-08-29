import { Controller, Post, Get, Delete, Param, UseGuards, Req, Res, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import { MediaService } from './media.service';
import { MediaFile } from './entities/media.entity';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Subir un archivo multimedia' })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Archivo subido exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const userId = (req.user as any).sub; // Obtener ID del usuario del token JWT
      const result = await this.mediaService.upload(file, userId);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener información de un archivo por ID' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Información del archivo' })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado' })
  async findOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.mediaService.findOne(id, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Archivo no encontrado',
      });
    }
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'Descargar un archivo por ID' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Archivo descargado exitosamente' })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado' })
  async download(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const fileData = await this.mediaService.download(id, userId);
      
      res.setHeader('Content-Type', fileData.mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${fileData.filename}"`);
      return res.send(fileData.buffer);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Archivo no encontrado',
      });
    }
  }

  @Get(':id/thumbnail')
  @ApiOperation({ summary: 'Obtener miniatura de un archivo por ID' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Miniatura del archivo' })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado' })
  async getThumbnail(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const thumbnailData = await this.mediaService.getThumbnail(id, userId);
      
      res.setHeader('Content-Type', thumbnailData.mimeType);
      return res.send(thumbnailData.buffer);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Miniatura no encontrada',
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un archivo' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Archivo eliminado exitosamente' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Archivo no encontrado' })
  async remove(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.mediaService.remove(id, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      if (error.message === 'No autorizado') {
        return res.status(HttpStatus.FORBIDDEN).json({
          success: false,
          message: 'No tienes permiso para eliminar este archivo',
        });
      }
      if (error.message === 'Archivo no encontrado') {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Archivo no encontrado',
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al eliminar el archivo',
      });
    }
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener archivos de un usuario específico' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Lista de archivos del usuario' })
  async findByUser(@Param('userId') userId: string, @Req() req: Request, @Res() res: Response) {
    try {
      const requesterId = (req.user as any).sub;
      const result = await this.mediaService.findByUser(userId, requesterId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener los archivos del usuario',
      });
    }
  }
}
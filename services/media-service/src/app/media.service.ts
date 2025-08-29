import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { MediaRepository } from './repositories/media.repository';
import { MediaFile } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async upload(file: Express.Multer.File, userId: string): Promise<any> {
    try {
      // Validar tipo de archivo
      if (!this.isValidFileType(file.mimetype)) {
        throw new BadRequestException('Tipo de archivo no permitido');
      }
      
      // Validar tamaño de archivo
      if (!this.isValidFileSize(file.size)) {
        throw new BadRequestException('El archivo excede el tamaño máximo permitido');
      }
      
      const mediaFile = new MediaFile();
      mediaFile.userId = userId;
      mediaFile.filename = file.originalname;
      mediaFile.mimeType = file.mimetype;
      mediaFile.size = file.size;
      mediaFile.filePath = ''; // En una implementación real, aquí iría la ruta al archivo almacenado
      
      // Generar miniatura si es una imagen
      if (file.mimetype.startsWith('image/')) {
        mediaFile.hasThumbnail = true;
      }
      
      const savedMediaFile = await this.mediaRepository.create(mediaFile);
      
      return {
        success: true,
        message: 'Archivo subido exitosamente',
        data: savedMediaFile,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al subir el archivo');
    }
  }

  async findOne(id: string, userId: string): Promise<any> {
    try {
      const mediaFile = await this.mediaRepository.findById(id);
      if (!mediaFile) {
        throw new NotFoundException('Archivo no encontrado');
      }
      
      // Verificar permisos de acceso
      if (mediaFile.userId !== userId && !mediaFile.isPublic) {
        throw new ForbiddenException('No autorizado');
      }
      
      return {
        success: true,
        data: mediaFile,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error('Error al obtener el archivo');
    }
  }

  async download(id: string, userId: string): Promise<any> {
    try {
      const mediaFile = await this.mediaRepository.findById(id);
      if (!mediaFile) {
        throw new NotFoundException('Archivo no encontrado');
      }
      
      // Verificar permisos de acceso
      if (mediaFile.userId !== userId && !mediaFile.isPublic) {
        throw new ForbiddenException('No autorizado');
      }
      
      // En una implementación real, aquí se leería el archivo del almacenamiento
      // y se retornaría su contenido. Por ahora retornamos un buffer de ejemplo.
      const buffer = Buffer.from(`Contenido del archivo ${mediaFile.filename}`, 'utf-8');
      
      return {
        buffer,
        filename: mediaFile.filename,
        mimeType: mediaFile.mimeType,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error('Error al descargar el archivo');
    }
  }

  async getThumbnail(id: string, userId: string): Promise<any> {
    try {
      const mediaFile = await this.mediaRepository.findById(id);
      if (!mediaFile) {
        throw new NotFoundException('Archivo no encontrado');
      }
      
      // Verificar permisos de acceso
      if (mediaFile.userId !== userId && !mediaFile.isPublic) {
        throw new ForbiddenException('No autorizado');
      }
      
      // Verificar que el archivo tenga miniatura
      if (!mediaFile.hasThumbnail) {
        throw new BadRequestException('El archivo no tiene miniatura');
      }
      
      // En una implementación real, aquí se leería la miniatura del almacenamiento
      // y se retornaría su contenido. Por ahora retornamos un buffer de ejemplo.
      const buffer = Buffer.from(`Miniatura del archivo ${mediaFile.filename}`, 'utf-8');
      
      return {
        buffer,
        mimeType: mediaFile.mimeType,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException || error instanceof BadRequestException) {
        throw error;
      }
      throw new Error('Error al obtener la miniatura');
    }
  }

  async remove(id: string, userId: string): Promise<any> {
    try {
      const mediaFile = await this.mediaRepository.findById(id);
      if (!mediaFile) {
        throw new NotFoundException('Archivo no encontrado');
      }
      
      // Verificar que el usuario sea el dueño del archivo
      if (mediaFile.userId !== userId) {
        throw new ForbiddenException('No autorizado');
      }
      
      await this.mediaRepository.remove(id);
      
      return {
        success: true,
        message: 'Archivo eliminado exitosamente',
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error('Error al eliminar el archivo');
    }
  }

  async findByUser(userId: string, requesterId: string): Promise<any> {
    try {
      // Verificar permisos (un usuario solo puede ver sus propios archivos a menos que sean públicos)
      if (userId !== requesterId) {
        throw new ForbiddenException('No autorizado');
      }
      
      const mediaFiles = await this.mediaRepository.findByUserId(userId);
      
      return {
        success: true,
        data: mediaFiles,
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error('Error al obtener los archivos del usuario');
    }
  }

  private isValidFileType(mimeType: string): boolean {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/quicktime',
      'video/x-msvideo',
      'audio/mpeg',
      'audio/wav',
      'audio/mp4',
    ];
    
    return allowedTypes.includes(mimeType);
  }

  private isValidFileSize(size: number): boolean {
    const maxSize = 50 * 1024 * 1024; // 50MB
    return size <= maxSize;
  }
}
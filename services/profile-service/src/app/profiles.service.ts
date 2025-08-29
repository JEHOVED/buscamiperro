import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ProfilesRepository } from './repositories/profiles.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(private readonly profilesRepository: ProfilesRepository) {}

  async findOne(id: string): Promise<any> {
    try {
      const profile = await this.profilesRepository.findById(id);
      if (!profile) {
        throw new NotFoundException('Perfil no encontrado');
      }
      
      return {
        success: true,
        data: profile,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error al obtener el perfil');
    }
  }

  async findOneByUserId(userId: string): Promise<any> {
    try {
      const profile = await this.profilesRepository.findByUserId(userId);
      if (!profile) {
        throw new NotFoundException('Perfil no encontrado');
      }
      
      return {
        success: true,
        data: profile,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error al obtener el perfil');
    }
  }

  async update(id: string, updateProfileDto: UpdateProfileDto, userId: string): Promise<any> {
    try {
      const profile = await this.profilesRepository.findById(id);
      if (!profile) {
        throw new NotFoundException('Perfil no encontrado');
      }
      
      // Verificar que el usuario sea el dueño del perfil
      if (profile.userId !== userId) {
        throw new ForbiddenException('No autorizado');
      }
      
      const updatedProfile = await this.profilesRepository.update(id, updateProfileDto);
      
      return {
        success: true,
        message: 'Perfil actualizado exitosamente',
        data: updatedProfile,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException('Error al actualizar el perfil');
    }
  }

  async updateByUserId(userId: string, updateProfileDto: UpdateProfileDto): Promise<any> {
    try {
      const profile = await this.profilesRepository.findByUserId(userId);
      if (!profile) {
        throw new NotFoundException('Perfil no encontrado');
      }
      
      const updatedProfile = await this.profilesRepository.update(profile.id, updateProfileDto);
      
      return {
        success: true,
        message: 'Perfil actualizado exitosamente',
        data: updatedProfile,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al actualizar el perfil');
    }
  }

  async remove(id: string, userId: string): Promise<any> {
    try {
      const profile = await this.profilesRepository.findById(id);
      if (!profile) {
        throw new NotFoundException('Perfil no encontrado');
      }
      
      // Verificar que el usuario sea el dueño del perfil
      if (profile.userId !== userId) {
        throw new ForbiddenException('No autorizado');
      }
      
      await this.profilesRepository.remove(id);
      
      return {
        success: true,
        message: 'Perfil eliminado exitosamente',
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error('Error al eliminar el perfil');
    }
  }

  async search(query: any): Promise<any> {
    try {
      const profiles = await this.profilesRepository.search(query);
      
      return {
        success: true,
        data: profiles,
      };
    } catch (error) {
      throw new Error('Error en la búsqueda');
    }
  }
}
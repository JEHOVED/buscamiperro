import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { SightingsRepository } from './repositories/sightings.repository';
import { CreateSightingDto } from './dto/create-sighting.dto';
import { UpdateSightingDto } from './dto/update-sighting.dto';
import { Sighting } from './entities/sighting.entity';

@Injectable()
export class SightingsService {
  constructor(private readonly sightingsRepository: SightingsRepository) {}

  async create(createSightingDto: CreateSightingDto, userId: string): Promise<any> {
    try {
      const sighting = new Sighting();
      Object.assign(sighting, createSightingDto);
      sighting.userId = userId;
      
      const savedSighting = await this.sightingsRepository.create(sighting);
      
      return {
        success: true,
        message: 'Avistamiento registrado exitosamente',
        data: savedSighting,
      };
    } catch (error) {
      throw new BadRequestException('Error al registrar el avistamiento');
    }
  }

  async findAll(page: number = 1, limit: number = 10, dogId?: string, status?: string): Promise<any> {
    try {
      const [sightings, total] = await this.sightingsRepository.findAll(page, limit, dogId, status);
      
      return {
        success: true,
        data: sightings,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error('Error al obtener la lista de avistamientos');
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const sighting = await this.sightingsRepository.findById(id);
      if (!sighting) {
        throw new NotFoundException('Avistamiento no encontrado');
      }
      
      return {
        success: true,
        data: sighting,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error al obtener el avistamiento');
    }
  }

  async update(id: string, updateSightingDto: UpdateSightingDto, userId: string): Promise<any> {
    try {
      const sighting = await this.sightingsRepository.findById(id);
      if (!sighting) {
        throw new NotFoundException('Avistamiento no encontrado');
      }
      
      // Verificar que el usuario sea el creador del avistamiento
      if (sighting.userId !== userId) {
        throw new ForbiddenException('No autorizado');
      }
      
      const updatedSighting = await this.sightingsRepository.update(id, updateSightingDto);
      
      return {
        success: true,
        message: 'Avistamiento actualizado exitosamente',
        data: updatedSighting,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException('Error al actualizar el avistamiento');
    }
  }

  async remove(id: string, userId: string): Promise<any> {
    try {
      const sighting = await this.sightingsRepository.findById(id);
      if (!sighting) {
        throw new NotFoundException('Avistamiento no encontrado');
      }
      
      // Verificar que el usuario sea el creador del avistamiento
      if (sighting.userId !== userId) {
        throw new ForbiddenException('No autorizado');
      }
      
      await this.sightingsRepository.remove(id);
      
      return {
        success: true,
        message: 'Avistamiento eliminado exitosamente',
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error('Error al eliminar el avistamiento');
    }
  }

  async findByDog(dogId: string): Promise<any> {
    try {
      const sightings = await this.sightingsRepository.findByDogId(dogId);
      
      return {
        success: true,
        data: sightings,
      };
    } catch (error) {
      throw new Error('Error al obtener los avistamientos del perro');
    }
  }

  async findByUser(userId: string): Promise<any> {
    try {
      const sightings = await this.sightingsRepository.findByUserId(userId);
      
      return {
        success: true,
        data: sightings,
      };
    } catch (error) {
      throw new Error('Error al obtener los avistamientos del usuario');
    }
  }

  async findNearby(longitude: number, latitude: number, radius: number): Promise<any> {
    try {
      const sightings = await this.sightingsRepository.findNearby(longitude, latitude, radius);
      
      return {
        success: true,
        data: sightings,
      };
    } catch (error) {
      throw new Error('Error al buscar avistamientos cercanos');
    }
  }
}
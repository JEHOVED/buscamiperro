import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { DogsRepository } from './repositories/dogs.repository';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';

@Injectable()
export class DogsService {
  constructor(private readonly dogsRepository: DogsRepository) {}

  async create(createDogDto: CreateDogDto, userId: string): Promise<any> {
    try {
      const dog = new Dog();
      Object.assign(dog, createDogDto);
      dog.userId = userId;
      
      const savedDog = await this.dogsRepository.create(dog);
      
      return {
        success: true,
        message: 'Perro registrado exitosamente',
        data: savedDog,
      };
    } catch (error) {
      throw new BadRequestException('Error al registrar el perro');
    }
  }

  async findAll(page: number = 1, limit: number = 10, status?: string): Promise<any> {
    try {
      const [dogs, total] = await this.dogsRepository.findAll(page, limit, status);
      
      return {
        success: true,
        data: dogs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error('Error al obtener la lista de perros');
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const dog = await this.dogsRepository.findById(id);
      if (!dog) {
        throw new NotFoundException('Perro no encontrado');
      }
      
      return {
        success: true,
        data: dog,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error al obtener el perro');
    }
  }

  async update(id: string, updateDogDto: UpdateDogDto, userId: string): Promise<any> {
    try {
      const dog = await this.dogsRepository.findById(id);
      if (!dog) {
        throw new NotFoundException('Perro no encontrado');
      }
      
      // Verificar que el usuario sea el dueño del perro
      if (dog.userId !== userId) {
        throw new ForbiddenException('No autorizado');
      }
      
      const updatedDog = await this.dogsRepository.update(id, updateDogDto);
      
      return {
        success: true,
        message: 'Perro actualizado exitosamente',
        data: updatedDog,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException('Error al actualizar el perro');
    }
  }

  async remove(id: string, userId: string): Promise<any> {
    try {
      const dog = await this.dogsRepository.findById(id);
      if (!dog) {
        throw new NotFoundException('Perro no encontrado');
      }
      
      // Verificar que el usuario sea el dueño del perro
      if (dog.userId !== userId) {
        throw new ForbiddenException('No autorizado');
      }
      
      await this.dogsRepository.remove(id);
      
      return {
        success: true,
        message: 'Perro eliminado exitosamente',
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error('Error al eliminar el perro');
    }
  }

  async findByUser(userId: string): Promise<any> {
    try {
      const dogs = await this.dogsRepository.findByUserId(userId);
      
      return {
        success: true,
        data: dogs,
      };
    } catch (error) {
      throw new Error('Error al obtener los perros del usuario');
    }
  }

  async search(criteria: { breed?: string; size?: string; color?: string; location?: string }): Promise<any> {
    try {
      const dogs = await this.dogsRepository.search(criteria);
      
      return {
        success: true,
        data: dogs,
      };
    } catch (error) {
      throw new Error('Error en la búsqueda');
    }
  }
}
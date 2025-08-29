import { Controller, Post, Get, Put, Delete, Body, Param, Query, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';

@ApiTags('dogs')
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo perro perdido' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Perro registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createDogDto: CreateDogDto, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub; // Obtener ID del usuario del token JWT
      const result = await this.dogsService.create(createDogDto, userId);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de perros perdidos' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Lista de perros perdidos' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status?: string,
    @Res() res: Response
  ) {
    try {
      const result = await this.dogsService.findAll(page, limit, status);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener la lista de perros',
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalles de un perro por ID' })
  @ApiResponse({ status: 200, description: 'Detalles del perro' })
  @ApiResponse({ status: 404, description: 'Perro no encontrado' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.dogsService.findOne(id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Perro no encontrado',
      });
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar información de un perro' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Perro actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Perro no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateDogDto: UpdateDogDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.dogsService.update(id, updateDogDto, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      if (error.message === 'No autorizado') {
        return res.status(HttpStatus.FORBIDDEN).json({
          success: false,
          message: 'No tienes permiso para actualizar este perro',
        });
      }
      if (error.message === 'Perro no encontrado') {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Perro no encontrado',
        });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un perro' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Perro eliminado exitosamente' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Perro no encontrado' })
  async remove(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.dogsService.remove(id, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      if (error.message === 'No autorizado') {
        return res.status(HttpStatus.FORBIDDEN).json({
          success: false,
          message: 'No tienes permiso para eliminar este perro',
        });
      }
      if (error.message === 'Perro no encontrado') {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Perro no encontrado',
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al eliminar el perro',
      });
    }
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener perros de un usuario específico' })
  @ApiResponse({ status: 200, description: 'Lista de perros del usuario' })
  async findByUser(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const result = await this.dogsService.findByUser(userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener los perros del usuario',
      });
    }
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar perros por criterios' })
  @ApiQuery({ name: 'breed', required: false, type: String })
  @ApiQuery({ name: 'size', required: false, type: String })
  @ApiQuery({ name: 'color', required: false, type: String })
  @ApiQuery({ name: 'location', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Resultados de búsqueda' })
  async search(
    @Query('breed') breed?: string,
    @Query('size') size?: string,
    @Query('color') color?: string,
    @Query('location') location?: string,
    @Res() res: Response
  ) {
    try {
      const result = await this.dogsService.search({ breed, size, color, location });
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error en la búsqueda',
      });
    }
  }
}
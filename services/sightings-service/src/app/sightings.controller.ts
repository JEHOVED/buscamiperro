import { Controller, Post, Get, Put, Delete, Body, Param, Query, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { SightingsService } from './sightings.service';
import { CreateSightingDto } from './dto/create-sighting.dto';
import { UpdateSightingDto } from './dto/update-sighting.dto';
import { Sighting } from './entities/sighting.entity';

@ApiTags('sightings')
@Controller('sightings')
export class SightingsController {
  constructor(private readonly sightingsService: SightingsService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo avistamiento' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Avistamiento registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createSightingDto: CreateSightingDto, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub; // Obtener ID del usuario del token JWT
      const result = await this.sightingsService.create(createSightingDto, userId);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de avistamientos' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'dogId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Lista de avistamientos' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('dogId') dogId?: string,
    @Query('status') status?: string,
    @Res() res: Response
  ) {
    try {
      const result = await this.sightingsService.findAll(page, limit, dogId, status);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener la lista de avistamientos',
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalles de un avistamiento por ID' })
  @ApiResponse({ status: 200, description: 'Detalles del avistamiento' })
  @ApiResponse({ status: 404, description: 'Avistamiento no encontrado' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.sightingsService.findOne(id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Avistamiento no encontrado',
      });
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar información de un avistamiento' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Avistamiento actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Avistamiento no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateSightingDto: UpdateSightingDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.sightingsService.update(id, updateSightingDto, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      if (error.message === 'No autorizado') {
        return res.status(HttpStatus.FORBIDDEN).json({
          success: false,
          message: 'No tienes permiso para actualizar este avistamiento',
        });
      }
      if (error.message === 'Avistamiento no encontrado') {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Avistamiento no encontrado',
        });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un avistamiento' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Avistamiento eliminado exitosamente' })
  @ApiResponse({ status: 403, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Avistamiento no encontrado' })
  async remove(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req.user as any).sub;
      const result = await this.sightingsService.remove(id, userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      if (error.message === 'No autorizado') {
        return res.status(HttpStatus.FORBIDDEN).json({
          success: false,
          message: 'No tienes permiso para eliminar este avistamiento',
        });
      }
      if (error.message === 'Avistamiento no encontrado') {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Avistamiento no encontrado',
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al eliminar el avistamiento',
      });
    }
  }

  @Get('dog/:dogId')
  @ApiOperation({ summary: 'Obtener avistamientos de un perro específico' })
  @ApiResponse({ status: 200, description: 'Lista de avistamientos del perro' })
  async findByDog(@Param('dogId') dogId: string, @Res() res: Response) {
    try {
      const result = await this.sightingsService.findByDog(dogId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener los avistamientos del perro',
      });
    }
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener avistamientos de un usuario específico' })
  @ApiResponse({ status: 200, description: 'Lista de avistamientos del usuario' })
  async findByUser(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const result = await this.sightingsService.findByUser(userId);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener los avistamientos del usuario',
      });
    }
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Buscar avistamientos cercanos' })
  @ApiQuery({ name: 'longitude', required: true, type: Number })
  @ApiQuery({ name: 'latitude', required: true, type: Number })
  @ApiQuery({ name: 'radius', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Avistamientos cercanos' })
  async findNearby(
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
    @Query('radius') radius: number = 5000, // 5km por defecto
    @Res() res: Response
  ) {
    try {
      const result = await this.sightingsService.findNearby(longitude, latitude, radius);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al buscar avistamientos cercanos',
      });
    }
  }
}
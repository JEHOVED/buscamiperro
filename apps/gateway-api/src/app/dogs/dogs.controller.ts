import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DogsService } from './dogs.service';

@ApiTags('Dogs')
@ApiBearerAuth('JWT-auth')
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all lost dogs' })
  async findAll(@Query() query: any) {
    return this.dogsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get dog by ID' })
  async findOne(@Param('id') id: string) {
    return this.dogsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Report a lost dog' })
  async create(@Body() createDogDto: any) {
    return this.dogsService.create(createDogDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update dog information' })
  async update(@Param('id') id: string, @Body() updateDogDto: any) {
    return this.dogsService.update(id, updateDogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete dog report' })
  async remove(@Param('id') id: string) {
    return this.dogsService.remove(id);
  }
}
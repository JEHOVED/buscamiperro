import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class DogsService {
  private readonly dogsServiceUrl = environment.services.dogs;

  constructor(private readonly httpService: HttpService) {}

  async findAll(query: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.dogsServiceUrl}/dogs`, { params: query })
      );
      return response.data;
    } catch (error) {
      return { success: false, message: 'Dogs service unavailable' };
    }
  }

  async findOne(id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.dogsServiceUrl}/dogs/${id}`)
      );
      return response.data;
    } catch (error) {
      return { success: false, message: 'Dogs service unavailable' };
    }
  }

  async create(createDogDto: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.dogsServiceUrl}/dogs`, createDogDto)
      );
      return response.data;
    } catch (error) {
      return { success: false, message: 'Dogs service unavailable' };
    }
  }

  async update(id: string, updateDogDto: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.put(`${this.dogsServiceUrl}/dogs/${id}`, updateDogDto)
      );
      return response.data;
    } catch (error) {
      return { success: false, message: 'Dogs service unavailable' };
    }
  }

  async remove(id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.dogsServiceUrl}/dogs/${id}`)
      );
      return response.data;
    } catch (error) {
      return { success: false, message: 'Dogs service unavailable' };
    }
  }
}
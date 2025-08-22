import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

@Module({
  imports: [HttpModule],
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
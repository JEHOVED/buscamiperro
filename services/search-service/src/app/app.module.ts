import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ElasticsearchService } from './services/elasticsearch.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [SearchController],
  providers: [SearchService, ElasticsearchService],
  exports: [SearchService],
})
export class AppModule {}
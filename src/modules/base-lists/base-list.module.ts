import { Module } from '@nestjs/common';
import { BaseListController } from './base-list.controller';
import { BaseListService } from './base-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseList } from './entities/base-list.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([BaseList])],
  controllers: [BaseListController],
  providers: [BaseListService],
})
export class BaseListModule {}

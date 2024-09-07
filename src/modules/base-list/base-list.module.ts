import { Module } from '@nestjs/common';
import { BaseListService } from './base-list.service';
import { BaseListController } from './base-list.controller';

@Module({
  controllers: [BaseListController],
  providers: [BaseListService],
})
export class BaseListModule {}

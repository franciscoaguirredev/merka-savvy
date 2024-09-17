import { Module } from '@nestjs/common';
import { BaseListController } from './base-list.controller';
import { BaseListService } from './base-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseList } from './entities/base-list.entity';
import { Product } from '../products/entities/product.entity';
import { Customer } from '../customers/entities/customer.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([BaseList, Customer, Product])],
  controllers: [BaseListController],
  providers: [BaseListService],
  exports:[BaseListModule, TypeOrmModule]
})
export class BaseListModule {}

import { forwardRef, Module } from '@nestjs/common';
import { PurchaseListService } from './purchase-list.service';
import { PurchaseListController } from './purchase-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseList } from './entities/purchase-list.entity';
import { CustomerModule } from '../customers/customer.module';
import { BaseListModule } from '../base-lists';

@Module({
  imports:[TypeOrmModule.forFeature([PurchaseList]),CustomerModule, BaseListModule],
  controllers: [PurchaseListController],
  providers: [PurchaseListService],
})
export class PurchaseListModule {}

import { Module } from '@nestjs/common';
import { PurchaseListService } from './purchase-list.service';
import { PurchaseListController } from './purchase-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseList } from './entities/purchase-list.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PurchaseList])],
  controllers: [PurchaseListController],
  providers: [PurchaseListService],
})
export class PurchaseListModule {}

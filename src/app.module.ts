import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { BaseListModule } from './base-list/base-list.module';
import { PurchaseListModule } from './purchase-list/purchase-list.module';

@Module({
  imports: [CustomerModule, BaseListModule, PurchaseListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

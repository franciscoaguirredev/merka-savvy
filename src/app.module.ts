import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './modules/customer/customer.module';
import { BaseListModule } from './modules/base-list/base-list.module';
import { PurchaseListModule } from './modules/purchase-list/purchase-list.module';

@Module({
  imports: [CustomerModule, BaseListModule, PurchaseListModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

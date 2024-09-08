import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseListModule } from './modules/base-list';
import { CustomerModule } from './modules/customer';
import { PurchaseListModule } from './modules/purchase-list';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './modules/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BaseListModule,
    CustomerModule,
    PurchaseListModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

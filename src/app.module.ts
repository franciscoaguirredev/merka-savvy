import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseListModule } from './modules/base-lists';
import { CustomerModule } from './modules/customers';
import { PurchaseListModule } from './modules/purchase-lists';
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

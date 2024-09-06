import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { BaseListModule } from './base-list/base-list.module';
import { PurchaseListModule } from './purchase-list/purchase-list.module';

@Module({
  imports: [CustomerModule, BaseListModule, PurchaseListModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'ba2x1nm0zbzywzfzxo1h-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'urdu0dqu8r9yobbb',
      password: 'rUEH0waomN6W2PpISUog',
      database: 'ba2x1nm0zbzywzfzxo1h',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // customerModule, BaseListModule, PurchaseListModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

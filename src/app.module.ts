import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseListModule } from './modules/base-lists';
import { CustomerModule } from './modules/customers';
import { PurchaseListModule } from './modules/purchase-lists';
import { DatabaseModule } from './modules/database.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/products/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BaseListModule,
    CustomerModule,
    ProductModule,
    PurchaseListModule,
    RolesModule,
    DatabaseModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './modules/customers/customer.module';
import { BaseListModule } from './modules/base-lists';
import { DatabaseModule } from './modules/database.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/products/product.module';
import { PurchaseListModule } from './modules/purchase-lists/purchase-list.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CustomerModule,
    BaseListModule,
    ProductModule,
    RolesModule,
    PurchaseListModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

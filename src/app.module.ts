import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BaseListModule } from './modules/base-lists';
import { CustomerModule } from './modules/customers/customer.module';
import { DatabaseModule } from './modules/database.module';
import { ProductModule } from './modules/products/product.module';
import { PurchaseListModule } from './modules/purchase-lists/purchase-list.module';
import { RolesGuard } from './modules/roles/roles-guard/roles.guard';
import { RolesModule } from './modules/roles/roles.module';

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
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule {}

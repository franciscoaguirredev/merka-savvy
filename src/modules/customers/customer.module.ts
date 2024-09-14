import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerService, JwtService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}

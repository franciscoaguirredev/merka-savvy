import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { ICustomerService } from './interfaces/customer.service.interface';
import { Customer } from './entities/customer.entity';

@Controller('customers')
export class CustomerController {
  constructor(
    @Inject('ICustomerService') private readonly customerService: ICustomerService
  ) {}

  @Post('register')
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = await this.customerService.create(createCustomerDto);
    return customer;
  }

}

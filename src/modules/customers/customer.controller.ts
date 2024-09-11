import { Controller, Post, Body, Inject } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService
  ) {}

  @Post('register')
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return await this.customerService.create(createCustomerDto);
  }
}

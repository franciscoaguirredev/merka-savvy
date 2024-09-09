import { Controller, Post, Body, Inject } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ICustomerService } from './interfaces/customer.service.interface';
import { Customer } from './entities/customer.entity';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: ICustomerService
  ) {}

  @Post('register')
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = await this.customerService.create(createCustomerDto);
    return customer;
  }

}

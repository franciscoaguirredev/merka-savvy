import { Controller, Post, Body, Patch, Param, NotFoundException, Delete, HttpCode, Get, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService) {}

  @Post('register')
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
    }
    
  @Patch('update/:email')
  async update(@Param('email') email: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<Customer>{
    return await this.customerService.update(email, updateCustomerDto);
  }

  @Delete('delete/:email')
  async remove(@Param('email') email: string): Promise<{ message: string }> {
    await this.customerService.remove(email);
    return { message: `Customer with email ${email} deleted succesfully` };
  }

  @Get()
  async findAll(): Promise<Customer[]> {
    return await this.customerService.getAllCustomers();
  }

  @Get('/:email')
  async findOne(@Param('email') email: string): Promise<Customer> {
    return await this.customerService.getByEmail(email);
    
  }
}

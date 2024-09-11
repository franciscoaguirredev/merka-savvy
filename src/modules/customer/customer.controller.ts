import { Controller, Post, Body, Patch, Param, NotFoundException, Delete, HttpCode, Get } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService
  ) {}

  @Post('register')
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    // console.log(createCustomerDto);
    return await this.customerService.create(createCustomerDto);
  }
  
  @Patch('update/:email')
  async update(@Param('email') email: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<Customer>{
    const updatedCustomer = await this.customerService.update(email, updateCustomerDto);
    if(!updatedCustomer){
      throw new NotFoundException(`Customer with email ${email} not found`);
    }
    return updatedCustomer;
  }

  @Delete('delete/:email')
  @HttpCode(200)
  async remove(@Param('email') email: string): Promise<{ message: string }> {
    const result = await this.customerService.remove(email);
    if(!result){
      throw new NotFoundException(`Customer with email ${email} not found`);
    }
    return { message: `Customer with email ${email} deleted succesfully` };
  }

  @Get()
  async findAll(): Promise<Customer[]> {
    return await this.customerService.getAllCustomers();
  }

  @Get('/:email')
  async findOne(@Param('email') email: string): Promise<Customer> {
    const customer = await this.customerService.getByEmail(email);
    if(!customer){
      throw new NotFoundException(`Customer with email ${email} doesn't exist`);
    }
    return customer;
  }
}

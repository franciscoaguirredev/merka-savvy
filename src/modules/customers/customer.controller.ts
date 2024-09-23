import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Delete,
  Get
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerResponse } from './dto/customer-response.dto';
import { ApiDocGetCustomers, ApiDocGetOneCustomer, ApiDocPostCustomer, ApiDocUpdateCustomer } from './docs/customer.decorators';

@ApiTags('Customers')
@ApiExtraModels(Customer)
@ApiExtraModels(CustomerResponse)
@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService) {}

  @ApiDocGetCustomers(Customer)
  @Get()
  async findAll(): Promise<Customer[]> {
    return await this.customerService.getAllCustomers();
  }

  @ApiDocGetOneCustomer(Customer)
  @Get('/:email')
  async findOne(@Body('email') email: string): Promise<Customer> {
    return await this.customerService.getByEmail(email);
  }
  
  @ApiDocPostCustomer(Customer)  
  @Post('register')
  @ApiResponse({status:201, description: 'Customer was created', type: Customer})
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Partial<Customer>> {
    return await this.customerService.create(createCustomerDto);
  }

  @ApiDocUpdateCustomer(Customer)
  @Patch('update/')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body('email') email: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return await this.customerService.update(email, updateCustomerDto);
  }

  @Delete('')
  @UseGuards(JwtAuthGuard)
  async remove(@Body('email') email: string): Promise<{ message: string }> {
    await this.customerService.remove(email);
    return { message: `Customer with email ${email} deleted successfully` };
  }
}

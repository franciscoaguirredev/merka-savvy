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

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService) {}

  @Post('register')
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Partial<Customer>> {
    return await this.customerService.create(createCustomerDto);
  }

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

  @Get()
  async findAll(): Promise<Customer[]> {
    return await this.customerService.getAllCustomers();
  }

  @Get('/:email')
  async findOne(@Body('email') email: string): Promise<Customer> {
    return await this.customerService.getByEmail(email);
  }
}

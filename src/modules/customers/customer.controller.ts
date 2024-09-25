import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Delete,
  Get,
  Param
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiDeleteCustomer, ApiDocPostCustomer, ApiGetAllCustomers, ApiGetCustomerByEmail } from './docs/customer.response';

@ApiTags('Customers')
@ApiBearerAuth()
@Controller('customers')
export class CustomerController {
  constructor(
  private readonly customerService: CustomerService) {}

  @ApiGetAllCustomers()
  @Get()
  async findAll(): Promise<Customer[]> {
    return await this.customerService.getAllCustomers();
  }

  @ApiGetCustomerByEmail()
  @Get('/:email')
  findOne(@Param('email') email: string){
    return this.customerService.getByEmail(email);
  }


  @Post('register')
  @ApiDocPostCustomer()
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

  @ApiDeleteCustomer()
  @ApiBearerAuth() 
  @Delete('')
  @UseGuards(JwtAuthGuard)
  remove(@Body('email') email: string): Promise<string>{
    return this.customerService.remove(email);
  }

}

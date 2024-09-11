import { Controller, Post, Body, Patch, Param, NotFoundException, Delete, HttpCode, Get, HttpException, HttpStatus } from '@nestjs/common';
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
    try {
      return await this.customerService.create(createCustomerDto);
    } catch (error) {
      if (error.message.includes('already exists')){
        throw new HttpException(
          { statusCode: HttpStatus.CONFLICT, message: error.message },
          HttpStatus.CONFLICT
        );
      }
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: 'Error creating customer' },
        HttpStatus.BAD_REQUEST
      )
    }
    
  }
  
  @Patch('update/:email')
  async update(@Param('email') email: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<{ message: string; customer?: Customer} >{
    try {
      const updatedCustomer = await this.customerService.update(email, updateCustomerDto);
    if(!updatedCustomer){
      throw new NotFoundException(`Customer with email ${email} not found`);
    }
    return {
      message: `Customer with email ${email} updated succesfully`,
      customer: updatedCustomer
      };
    } catch (error) {
      if (error.message.includes('not found')){
        throw new HttpException(
          { statusCode: HttpStatus.NOT_FOUND, message: error.message },
          HttpStatus.NOT_FOUND
        );
      }
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: 'Error updating customer' },
        HttpStatus.BAD_REQUEST
      );
    }
    
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

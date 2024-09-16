import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
  @InjectRepository(Customer)
  private readonly customerRepository: Repository<Customer>
  ){}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      const hashedPassword = await bcrypt.hash(customer.password, 10);
      customer.password = hashedPassword;
      customer.role = 2
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async update(email: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer | null> {
    try {
      const customer = await this.customerRepository.findOneBy({ email });
      if (!customer) {
        throw new NotFoundException(`Customer with email ${email} not found`);
      }
      Object.assign(customer, updateCustomerDto);
      if(updateCustomerDto.password){
        const hashedPassword = await bcrypt.hash(updateCustomerDto.password, 10);
        customer.password = hashedPassword;
      }
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(email: string): Promise<Boolean> {
    try {
      const result = await this.customerRepository.delete({ email });
      return result.affected > 0;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllCustomers(): Promise<Customer[]>{
    try {
      return await this.customerRepository.find()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getByEmail(email: string): Promise<Customer>{
    try {
      const costumer = await this.customerRepository.findOne({where: { email }})
      if(!costumer){
        throw new NotFoundException(`Customer with email ${email} not found`)
      }
      return costumer
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

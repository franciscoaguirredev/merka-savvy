import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      const existingCustomer = await this.customerRepository.findOneBy({ email: createCustomerDto.email });
      if (existingCustomer) {
        throw new ConflictException('Customer already exists');
      }

      const customer = this.customerRepository.create(createCustomerDto);
      const hashedPassword = await bcrypt.hash(customer.password, 10);
      customer.password = hashedPassword;
      customer.role = 2;
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create customer');
    }
  }

  async update(email: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    try {
      const customer = await this.customerRepository.findOneBy({ email });
      if (!customer) {
        throw new NotFoundException(`Customer with email ${email} not found`);
      }

      Object.assign(customer, updateCustomerDto);

      if (updateCustomerDto.password) {
        const hashedPassword = await bcrypt.hash(updateCustomerDto.password, 10);
        customer.password = hashedPassword;
      }

      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update customer');
    }
  }

  async remove(email: string): Promise<void> {
    try {
      const result = await this.customerRepository.delete({ email });
      if (result.affected === 0) {
        throw new NotFoundException(`Customer with email ${email} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete customer');
    }
  }

  async getAllCustomers(): Promise<Customer[]> {
    try {
      return await this.customerRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to get customers');
    }
  }

  async getByEmail(email: string): Promise<Customer> {
    try {
      const customer = await this.customerRepository.findOneBy({ email });
      if (!customer) {
        throw new NotFoundException(`Customer with email ${email} not found`);
      }
      return customer;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get customer');
    }
  }
}

import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Partial<Customer>> {
    try {
      const existingCustomer = await this.customerRepository.findOneBy({
        email: createCustomerDto.email,
      });
  
      if (existingCustomer) {
        throw new ConflictException('Customer already exists');
      }
  
      const hashedPassword = await bcrypt.hash(createCustomerDto.password, 10);
      const customer = this.customerRepository.create({
        ...createCustomerDto,
        password: hashedPassword,
        role,
      });
  
      await this.customerRepository.save(customer);
      return {
        name: customer.name,
        email: customer.email,
        role: customer.role.name,
        id: customer.id
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to create customer');
    }
  }

  async update(email: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    try {
      const customer = await this.customerRepository.findOneBy({ email });
  
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
  
      if (updateCustomerDto.password) {
        updateCustomerDto.password = await bcrypt.hash(updateCustomerDto.password, 10);
      }
  
      Object.assign(customer, updateCustomerDto);
  
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update customer');
    }
  }

  async remove(email: string): Promise<void> {
    try {
      const result = await this.customerRepository.delete({ email });

      if (result.affected === 0) {
        throw new NotFoundException('Customer not found');
      }
    } catch (error) {
      throw new NotFoundException();
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
        throw new NotFoundException('Customer not found');
      }

      return customer;
    } catch (error) {
      throw new NotFoundException('Failed to get customer');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
  @InjectRepository(Customer)
  private readonly customerRepository: Repository<Customer>
  ){}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }
}

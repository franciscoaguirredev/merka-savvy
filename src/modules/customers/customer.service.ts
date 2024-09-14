import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class CustomerService {
  constructor(
  @InjectRepository(Customer)
  private readonly customerRepository: Repository<Customer>
  ){}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      const password = customer.password

      const hashedPassword = await bcrypt.hash(password, 10);
      customer.password = hashedPassword;

      customer.role = 2
       return await this.customerRepository.save(customer);
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async findOneByEmail(email:string){
    return  this.customerRepository.findOneBy({email:email}) 
  }  

  async findOne(id: number) {
    return await this.customerRepository.findOneBy({id:id});
  }
}

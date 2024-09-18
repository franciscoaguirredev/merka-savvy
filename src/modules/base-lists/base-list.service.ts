import { Injectable } from '@nestjs/common';
import { CreateBaseListDto } from './dto/create-base-list.dto';
import { UpdateBaseListDto } from './dto/update-base-list.dto';
import { BaseList } from './entities/base-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../products/entities/product.entity';
import { Customer } from '../customers/entities/customer.entity';

@Injectable()
export class BaseListService {

  constructor(
    @InjectRepository(BaseList)
    private readonly baseListRepository: Repository<BaseList>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createBaseList(createBaseListDto: CreateBaseListDto): Promise<BaseList> {
    const { name, customerId, products } = createBaseListDto;
    
    try {
        const customer = await this.customerRepository.findOne({ where: { id: customerId } });  
        if (!customer) {
        throw new Error('Customer not found');
        }

      const createdProducts = [];
      for (const productData of products) {
        const newProduct = this.productRepository.create(productData);
        const savedProduct = await this.productRepository.save(newProduct);
        createdProducts.push(savedProduct);
      }

      const baseList = this.baseListRepository.create({
        name,
        customer,
        products: createdProducts,
      });

      return await this.baseListRepository.save(baseList);
    } catch (error) {
      console.error(error)
    }
  }

  async findAllWithProducts(): Promise<BaseList[]> {
    return await this.baseListRepository.find({
      relations: ['products'],
    });
  }


  async findAll() {
      return await this.baseListRepository.find()
  }

  findOne(id: number) {
      return `This action returns a #${id} baseList`;
  }

  update(id: number, updateBaseListDto: UpdateBaseListDto) {
    return `This action updates a #${id} baseList`;
  }

  remove(id: number) {
      return `This action removes a #${id} baseList`;
  } 
}

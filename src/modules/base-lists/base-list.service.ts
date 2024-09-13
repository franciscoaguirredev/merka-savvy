import { Injectable } from '@nestjs/common';
import { CreateBaseListDto } from './dto/create-base-list.dto';
import { UpdateBaseListDto } from './dto/update-base-list.dto';
import { BaseList } from './entities/base-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../customers';
import { Product } from '../products/entities/product.entity';

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
    const { name, customerId, productIds } = createBaseListDto;

    const customer = await this.customerRepository.findOne({ where: { id: customerId } });
    const products = await this.productRepository.findByIds(productIds);

    const baseList = this.baseListRepository.create({
      name,
      customer,
      products,
    });

    return this.baseListRepository.save(baseList);
  }



  create(createBaseListDto: CreateBaseListDto) {
    return 'This action adds a new baseList';
  }

  findAll() {
    return `This action returns all baseList`;
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

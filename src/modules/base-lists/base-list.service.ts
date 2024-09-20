import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async createBaseList(createBaseListDto: CreateBaseListDto){
    const { name, customerId, products } = createBaseListDto;
    
    try {
        const customer = await this.customerRepository.findOne({ where: { id: customerId } });  
        if (!customer) {
        throw new Error('Customer not found');
        }

      const createdProducts = [];
      const activeProducts = [];
      const inactiveProducts =[]
      let total= 0
      for (const productData of products) {
        const newProduct = this.productRepository.create(productData);
        const savedProduct = await this.productRepository.save(newProduct);
        createdProducts.push(savedProduct);
        if (productData.isActive == true){
          total = total + productData.price
          activeProducts.push(productData)
        }else if(productData.isActive == false){
          inactiveProducts.push(productData)
        } 
      }

      const baseList = this.baseListRepository.create({
        name,
        total,
        customer,
        products: createdProducts,
      });

      const newbaseList = await this.baseListRepository.save(baseList);

      return {
        Customer: customer.id,
        idBaseList: newbaseList.id,
        BaseListName: name,
        Total: total,
        TotalProducts: products.length,
        ActiveProducts: activeProducts,
        InactiveProducts: inactiveProducts
      }
    } catch (error) {
      console.log(error)
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

  async findOne(baseListId: string) {
    try {
      const baseList = await this.baseListRepository.findOne({
      where: { id: baseListId },
      relations: ['products'],
    });

    if (!baseList) {
      throw new NotFoundException(`BaseList con id ${baseListId} no encontrada`);
    }
    
    const {products} = baseList
      const activeProducts = [];
      const inactiveProducts =[]
      let total= 0
      for (const productData of products) {
        if (productData.isActive == true){
          total = total + productData.price
          activeProducts.push(productData)
        }else if(productData.isActive == false){
          inactiveProducts.push(productData)
        } 
      }

    return{
        id: baseList.id,
        BaseListName: baseList.name,
        Total: total,
        TotalProducts: activeProducts.length,
        ActiveProducts: activeProducts,
        InactiveProducts: inactiveProducts
      }
    } catch (error) {
      console.log(error)
    }
  }

  async updateBaseList(id: string, customer_id: number, updateBaseListDto: UpdateBaseListDto){
    const { name, customerId, products } = updateBaseListDto;
    try {
      const baseList = await this.baseListRepository.findOne({
      where: { id },
      relations: {products:true, customer:true},
      
    });
    
    if (!baseList) {
      throw new NotFoundException('BaseList not found');
    }

    if (baseList.customer.id !== customer_id) {
      throw new BadRequestException('This BaseList does not belong to the customer');
    }
  
    baseList.name = name;

    const existingProducts = baseList.products;
    const activeProducts = [];
    const inactiveProducts =[];
    let total= 0
    
    for (const productDto of products) {
      const existingProduct = existingProducts.find(
        (prod) => prod.name === productDto.name
      );

      if (existingProduct) {
        existingProduct.price = productDto.price;
        existingProduct.provider = productDto.provider;
        existingProduct.measure = productDto.measure;
        existingProduct.isActive = productDto.isActive;
      } else {
        const newProduct = this.productRepository.create(productDto);
        existingProducts.push(newProduct);
      }

      if(productDto.isActive==true){
        activeProducts.push(productDto)
        total = total + productDto.price
      }else if(productDto.isActive == false){
        inactiveProducts.push(productDto)
      }
    }
    baseList.total = total
    await this.productRepository.save(existingProducts);
    const newbaseList = await this.baseListRepository.save(baseList);
    return {
        idBaseList: newbaseList.id,
        BaseListName: newbaseList.name,
        Total: total,
        TotalProducts: activeProducts.length,
        ActiveProducts: activeProducts,
        InactiveProducts: inactiveProducts
      }
    } catch (error) {
      console.log(error)
    }
  }

  async deleteBaseList(baseListId: string){
    try {
      const baseList = await this.baseListRepository.findOne({
      where: { id: baseListId },
      relations: ['products'], 
    });

    if (!baseList) {
      throw new NotFoundException(`BaseList con id ${baseListId} no encontrada`);
    }

    if (baseList.products && baseList.products.length > 0) {
      await this.productRepository.remove(baseList.products);
    }
    await this.baseListRepository.remove(baseList);
    
    } catch (error) {
      console.log(error)
    }
  }
}

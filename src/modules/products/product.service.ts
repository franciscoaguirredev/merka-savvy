import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async createProduct(createProductListDto: CreateProductDto): Promise<Product> {
        const product = this.productRepository.create(createProductListDto);
        return this.productRepository.save(product);
    }
}
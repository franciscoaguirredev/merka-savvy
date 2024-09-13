import { Controller, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productService.createProduct(createProductDto);
    }
}
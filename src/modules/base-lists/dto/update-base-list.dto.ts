import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseListDto } from './create-base-list.dto';
import { ArrayMinSize, IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductDto } from 'src/modules/products/dto/create-product.dto';

export class UpdateBaseListDto {
  @IsString()
  name: string;

  @IsNumber()
  customerId: number; 

  @IsNumber()
  budget:number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];
}

import { Type } from 'class-transformer';
import { IsString, IsArray, IsNumber, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateProductDto } from 'src/modules/products/dto/create-product.dto';

export class CreateBaseListDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  budget:number

  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];
}

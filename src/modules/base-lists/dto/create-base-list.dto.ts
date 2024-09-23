import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsArray, IsNumber, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateProductDto } from 'src/modules/products/dto/create-product.dto';


export class CreateBaseListDto{
  @IsNotEmpty()
  @IsString()
  @ApiProperty({example:'Christmas'})
  name: string;

  @IsNumber()
  @ApiProperty({example: '500000', nullable: false, description: 'Insert the value without commas or periods'}) 
  budget:number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({example: '1', nullable: false, description: 'Id of Customer logged'}) 
  customerId: number;

  @IsArray()
  @ApiProperty({example: 'Products:[{"name": "Producto C", "price": 100, "provider": "Proveedor B","measure": "kg", "quantityBL": 13, "isActive": true}, {} ...]', nullable: false, description: 'Id of Customer logged'}) 
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];
}

import { ApiProperty } from "@nestjs/swagger";
import { CreateProductDto } from "src/modules/products/dto/create-product.dto";

export class BaseListResponse {

    @ApiProperty({ example: 1 })
    id: number;
  
    @ApiProperty({ example: 'Jhon Doe' })
    name: string;

    @ApiProperty({example: '500000', nullable: false, description: 'Insert the value without commas or periods'}) 
    budget:number

    @ApiProperty({example: 'Products:[{"name": "Producto C", "price": 100, "provider": "Proveedor B","measure": "kg", "quantityBL": 13, "isActive": true}, {} ...]', nullable: false, description: 'Id of Customer logged'}) 
    products: CreateProductDto[];
}
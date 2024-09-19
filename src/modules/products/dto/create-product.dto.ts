import { IsString, IsInt, IsBoolean, IsNumber } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsInt()
    price: number;

    @IsString()
    provider: string;

    @IsString()
    measure: string;

    @IsNumber()
    quantityBL:number

    @IsBoolean()
    isActive: boolean;
}
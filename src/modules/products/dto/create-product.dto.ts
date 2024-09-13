import { IsString, IsInt, IsBoolean } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsInt()
    price: number;

    @IsString()
    provider: string;

    @IsString()
    measure: string;

    @IsBoolean()
    isActive: boolean;
}
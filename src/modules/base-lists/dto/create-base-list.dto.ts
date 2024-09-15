import { IsString, IsArray, IsNumber, IsNotEmpty, ArrayNotEmpty, ArrayContains, IsInt } from 'class-validator';

export class CreateBaseListDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    customerId: number;

    @IsNotEmpty()
    @IsArray()
    productIds: string[];

    


}

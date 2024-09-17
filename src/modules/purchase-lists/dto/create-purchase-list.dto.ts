import { IsArray, IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreatePurchaseListDto {
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    customerId: number;

    @IsNotEmpty()
    @IsString()
    @Min(1)
    baseListId: string

    @IsNumber()
    @IsNotEmpty()
    total: number;

    @IsDateString()
    @IsNotEmpty()
    purchaseDate: Date;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsNotEmpty()
    @IsArray()
    baseListJson: Array<Product>;

}
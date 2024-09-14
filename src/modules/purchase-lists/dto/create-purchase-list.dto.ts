import { IsArray, IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class CreatePurchaseListDto {
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    customerId: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    baseListId: number;

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

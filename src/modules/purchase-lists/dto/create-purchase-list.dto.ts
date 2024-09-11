import { IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class CreatePurchaseListDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    userId?: number;

    @IsNumber()
    @IsNotEmpty()
    total: number;

    @IsDate()
    @IsNotEmpty()
    purchaseDate: Date;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsNotEmpty()
    @IsArray()
    baseListJson: Array<Product>;

}

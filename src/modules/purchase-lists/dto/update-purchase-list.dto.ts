import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseListDto } from './create-purchase-list.dto';
import { IsOptional } from 'class-validator';

export class UpdatePurchaseListDto extends PartialType(CreatePurchaseListDto) {
}

import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseListDto } from './create-purchase-list.dto';

export class UpdatePurchaseListDto extends PartialType(CreatePurchaseListDto) {}

import { Injectable } from '@nestjs/common';
import { CreatePurchaseListDto } from './dto/create-purchase-list.dto';
import { UpdatePurchaseListDto } from './dto/update-purchase-list.dto';

@Injectable()
export class PurchaseListService {
  create(createPurchaseListDto: CreatePurchaseListDto) {
    return 'This action adds a new purchaseList';
  }

  findAll() {
    return `This action returns all purchaseList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseList`;
  }

  update(id: number, updatePurchaseListDto: UpdatePurchaseListDto) {
    return `This action updates a #${id} purchaseList`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseList`;
  }
}

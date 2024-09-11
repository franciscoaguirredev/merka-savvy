import { Injectable } from '@nestjs/common';
import { CreatePurchaseListDto } from './dto/create-purchase-list.dto';
import { UpdatePurchaseListDto } from './dto/update-purchase-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseList } from './entities/purchase-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseListService {

  constructor(
    @InjectRepository(PurchaseList) private readonly purchaseListRespository : Repository<PurchaseList>
  ){}


  create(createPurchaseListDto: CreatePurchaseListDto) {
    return 'This action adds a new purchaseList';
  }

  async findAll() {
    try {
      const findAll = await this.purchaseListRespository.find()
      console.log(findAll)
      return findAll;
    } catch (error) {
      console.log(error)
    }
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

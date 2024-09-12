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


  async create(createPurchaseListDto: CreatePurchaseListDto) {
    try{
      const purchaseList = this.purchaseListRespository.create(createPurchaseListDto)
      return await this.purchaseListRespository.save(createPurchaseListDto)
    }
    catch(error){
      throw new Error(error.message)
    }
  }

  async findAll():Promise<PurchaseList[]> {
    try {
      return await this.purchaseListRespository.find()
    } catch (error) {
      console.log(error)
    }
  }

  async findOne(id: number) {
    try{
      return await this.purchaseListRespository.findOneBy({id});
    }catch(error){
      throw new Error(error.message)
    }
  }

  async update(id: number, updatePurchaseListDto: UpdatePurchaseListDto) {
    const findpurchaseList = await this.purchaseListRespository.preload({
      id:id,
      ...updatePurchaseListDto
    })

    if(!findpurchaseList){
      return `Purchase List with id ${id} not found`
    }

    try {
      await this.purchaseListRespository.save(updatePurchaseListDto);
      return updatePurchaseListDto;
    } catch (error) {
      console.log(`Error is: ${error}`)
    }

    return `Purchase List with id ${id} has been updated`;
  }

    async remove(id: number) {
      const findpurchaseList = await this.purchaseListRespository.findOneBy({id});
      if(!findpurchaseList){
        return `Purchase List with id ${id} not found`
      }
      try{
        await this.purchaseListRespository.delete(id)
        return `Purchase List with id ${id} has been deleted`
      } catch(error){
        console.log(`Error is: ${error}`)
      }
    }
  }
  


 


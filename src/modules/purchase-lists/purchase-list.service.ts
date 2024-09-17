import { Injectable } from '@nestjs/common';
import { CreatePurchaseListDto } from './dto/create-purchase-list.dto';
import { UpdatePurchaseListDto } from './dto/update-purchase-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseList } from './entities/purchase-list.entity';
import { Repository } from 'typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { BaseList } from '../base-lists/entities/base-list.entity';


@Injectable()
export class PurchaseListService {

  constructor(
    @InjectRepository(PurchaseList) private readonly purchaseListRespository : Repository<PurchaseList>,
    @InjectRepository(Customer) private readonly customerRespository: Repository<Customer>,
    @InjectRepository(BaseList) private readonly baseListRepository: Repository<BaseList>
  ){}


  async create(createPurchaseListDto: CreatePurchaseListDto) {
    try{
       const customer = await this.customerRespository.findOneBy({id:createPurchaseListDto.customerId})
       const {baseListId} = createPurchaseListDto 
       const baseList = await this.baseListRepository.findOneBy({id:baseListId})
      
       const purchaseDate = new Date(createPurchaseListDto.purchaseDate);
      const purchaseList = this.purchaseListRespository.create({total:createPurchaseListDto.total,purchaseDate,baseListJson:createPurchaseListDto.baseListJson,
        baseList,customer
      })

      await this.purchaseListRespository.save(createPurchaseListDto)
      return { success: true, message: 'Purchase list successfully created.', purchaseList };
    }
    catch(error){
      return { success: false, message: `Error creating purchase list: ${error.message}` };
    }
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

  async findOne(id: number) {
    try{
      return await this.purchaseListRespository.findOneBy({id});
    }catch(error){
      throw new Error(error.message)
    }
  }

  async update(id: number, updatePurchaseListDto: UpdatePurchaseListDto) {
    const findpurchaseList = await this.purchaseListRespository.preload({
      id: id,
      ...updatePurchaseListDto
    })

    if(!findpurchaseList){
      return `Purchase List with id ${id} not found`
    }

    try {
      const updatedPurchaseList= await this.purchaseListRespository.save(findpurchaseList);
      return { success: true, message: 'Purchase list successfully created.' , updatedPurchaseList } ;
    } catch (error) {
      console.error(`Error occurred while updating: ${error}`);
      return `Error occurred while updating Purchase List with id ${id}`;
    }

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

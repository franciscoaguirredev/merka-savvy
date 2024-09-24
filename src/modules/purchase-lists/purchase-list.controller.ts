import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseListService } from './purchase-list.service';
import { CreatePurchaseListDto } from './dto/create-purchase-list.dto';
import { UpdatePurchaseListDto } from './dto/update-purchase-list.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Purchases-List')
@ApiBearerAuth()
@Controller('purchase-list')
export class PurchaseListController {
  constructor(private readonly purchaseListService: PurchaseListService) {}

  @Post()
  create(@Body() createPurchaseListDto: CreatePurchaseListDto) {
    return this.purchaseListService.create(createPurchaseListDto);
  }

  @Get()
  findAll() {
    return this.purchaseListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseListDto: UpdatePurchaseListDto) {
    return this.purchaseListService.update(+id, updatePurchaseListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseListService.remove(+id);
  }
}

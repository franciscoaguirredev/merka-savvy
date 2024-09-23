import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
import { BaseListService } from './base-list.service';
import { CreateBaseListDto } from './dto/create-base-list.dto';
import { UpdateBaseListDto } from './dto/update-base-list.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { BaseList } from './entities/base-list.entity';
import { BaseListResponse } from './dto/base-list-response.dto';
import {
  ApiDocCreateBaseList,
  ApiDocDeleteBaseList,
  ApiDocFindAllBaseLists,
  ApiDocFindOneBaseList,
  ApiDocGetAllBaseLists,
  ApiDocUpdateBaseList
} from './docs/base-list.doc'


@ApiTags('Bases-List')
@ApiExtraModels(BaseListResponse)
@Controller('base-list')
export class BaseListController {
  constructor(private readonly baseListService: BaseListService) {}

  @ApiDocFindAllBaseLists(BaseList)
  @Get()
  findAll() {
    return this.baseListService.findAll();
  }

  @ApiDocGetAllBaseLists(BaseList)
  @Get('all')
  getAllBaseLists(){
    return this.baseListService.findAllWithProducts();
  }
    
  @ApiDocFindOneBaseList(BaseList)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baseListService.findOne(id);
  }

  @ApiDocCreateBaseList(BaseList)
  @Post()
    createBaseList(@Body() createBaseListDto: CreateBaseListDto) {
      return this.baseListService.createBaseList(createBaseListDto);
    }

  
  @ApiDocUpdateBaseList(BaseList)
  @Patch(':id')
  update(
    @Param('id') base_list_id: string,
    @Body('customerId',ParseIntPipe) customer_id: number,
    @Body() update_base_list_dto: UpdateBaseListDto,
  ) {
    return this.baseListService.updateBaseList(base_list_id, customer_id, update_base_list_dto);
  }

  @ApiDocDeleteBaseList()
  @Delete(':id')
  async deleteBaseList(@Param('id', ParseIntPipe) baseListId: string): Promise<void> {
    return this.baseListService.deleteBaseList(baseListId);
  }
}

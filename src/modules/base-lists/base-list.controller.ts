import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
import { BaseListService } from './base-list.service';
import { CreateBaseListDto } from './dto/create-base-list.dto';
import { UpdateBaseListDto } from './dto/update-base-list.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bases-List')
@Controller('base-list')
export class BaseListController {
  constructor(private readonly baseListService: BaseListService) {}

  @Post()
    createBaseList(@Body() createBaseListDto: CreateBaseListDto) {
      return this.baseListService.createBaseList(createBaseListDto);
    }

  @Get()
  findAll() {
    return this.baseListService.findAll();
  }

  @Get('all')
  getAllBaseLists(){
    return this.baseListService.findAllWithProducts();
  }
    

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baseListService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') base_list_id: string,
    @Body('customerId',ParseIntPipe) customer_id: number,
    @Body() update_base_list_dto: UpdateBaseListDto,
  ) {
    return this.baseListService.updateBaseList(base_list_id, customer_id, update_base_list_dto);
  }

  @Delete(':id')
  async deleteBaseList(@Param('id', ParseIntPipe) baseListId: string): Promise<void> {
    return this.baseListService.deleteBaseList(baseListId);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaseListService } from './base-list.service';
import { CreateBaseListDto } from './dto/create-base-list.dto';
import { UpdateBaseListDto } from './dto/update-base-list.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baseListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaseListDto: UpdateBaseListDto) {
    return this.baseListService.update(+id, updateBaseListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baseListService.remove(+id);
  }
}

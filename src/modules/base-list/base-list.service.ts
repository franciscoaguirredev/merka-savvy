import { Injectable } from '@nestjs/common';
import { CreateBaseListDto } from './dto/create-base-list.dto';
import { UpdateBaseListDto } from './dto/update-base-list.dto';

@Injectable()
export class BaseListService {
  create(createBaseListDto: CreateBaseListDto) {
    return 'This action adds a new baseList';
  }

  findAll() {
    return `This action returns all baseList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} baseList`;
  }

  update(id: number, updateBaseListDto: UpdateBaseListDto) {
    return `This action updates a #${id} baseList`;
  }

  remove(id: number) {
    return `This action removes a #${id} baseList`;
  }
}

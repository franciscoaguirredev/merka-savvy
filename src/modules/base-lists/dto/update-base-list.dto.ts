import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseListDto } from './create-base-list.dto';

export class UpdateBaseListDto extends PartialType(CreateBaseListDto) {}

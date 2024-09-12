import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from './entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [],
  controllers: [],
  exports: [],
})
export class RolesModule {}
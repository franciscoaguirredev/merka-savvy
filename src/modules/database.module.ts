import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './common/config/connection-db.config';
import { SeedService } from './database/seeds/seed.service';
import { SeedModule } from './database/seeds/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    SeedModule
  ],
  providers: [
    DatabaseConfigService,],
  exports: [DatabaseConfigService],
})
export class DatabaseModule implements OnModuleInit{
    constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.seed();
  }
}

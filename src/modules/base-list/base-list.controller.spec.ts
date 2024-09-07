import { Test, TestingModule } from '@nestjs/testing';
import { BaseListController } from './base-list.controller';
import { BaseListService } from './base-list.service';

describe('BaseListController', () => {
  let controller: BaseListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseListController],
      providers: [BaseListService],
    }).compile();

    controller = module.get<BaseListController>(BaseListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

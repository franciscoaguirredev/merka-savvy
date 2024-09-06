import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseListController } from './purchase-list.controller';
import { PurchaseListService } from './purchase-list.service';

describe('PurchaseListController', () => {
  let controller: PurchaseListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseListController],
      providers: [PurchaseListService],
    }).compile();

    controller = module.get<PurchaseListController>(PurchaseListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

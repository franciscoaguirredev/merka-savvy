import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseListService } from './purchase-list.service';

describe('PurchaseListService', () => {
  let service: PurchaseListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseListService],
    }).compile();

    service = module.get<PurchaseListService>(PurchaseListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

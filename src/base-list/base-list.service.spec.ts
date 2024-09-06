import { Test, TestingModule } from '@nestjs/testing';
import { BaseListService } from './base-list.service';

describe('BaseListService', () => {
  let service: BaseListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseListService],
    }).compile();

    service = module.get<BaseListService>(BaseListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

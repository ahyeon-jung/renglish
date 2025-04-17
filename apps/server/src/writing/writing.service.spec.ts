import { Test, TestingModule } from '@nestjs/testing';
import { WritingService } from './writing.service';

describe('WritingService', () => {
  let service: WritingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WritingService],
    }).compile();

    service = module.get<WritingService>(WritingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

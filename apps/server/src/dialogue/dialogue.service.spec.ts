import { Test, TestingModule } from '@nestjs/testing';
import { DialogueService } from './dialogue.service';

describe('DialogueService', () => {
  let service: DialogueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DialogueService],
    }).compile();

    service = module.get<DialogueService>(DialogueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

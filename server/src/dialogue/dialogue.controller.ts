import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { DialogueService } from './dialogue.service';

@ApiTags('Dialogues')
@Controller('dialogue')
export class DialogueController {
  constructor(private readonly dialogueService: DialogueService) {}
}

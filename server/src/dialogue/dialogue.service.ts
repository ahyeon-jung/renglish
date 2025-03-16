import { Injectable } from '@nestjs/common';
import { CreateDialogueDto } from './dto/create-dialogue.dto';
import { UpdateDialogueDto } from './dto/update-dialogue.dto';

@Injectable()
export class DialogueService {
  create(createDialogueDto: CreateDialogueDto) {
    return 'This action adds a new dialogue';
  }

  findAll() {
    return `This action returns all dialogue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dialogue`;
  }

  update(id: number, updateDialogueDto: UpdateDialogueDto) {
    return `This action updates a #${id} dialogue`;
  }

  remove(id: number) {
    return `This action removes a #${id} dialogue`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateWritingDto } from './dto/create-writing.dto';
import { UpdateWritingDto } from './dto/update-writing.dto';

@Injectable()
export class WritingService {
  create(createWritingDto: CreateWritingDto) {
    return 'This action adds a new writing';
  }

  findAll() {
    return `This action returns all writing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} writing`;
  }

  update(id: number, updateWritingDto: UpdateWritingDto) {
    return `This action updates a #${id} writing`;
  }

  remove(id: number) {
    return `This action removes a #${id} writing`;
  }
}

import { CreateWritingDto } from './dto/create-writing.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Writing } from './entities/writing.entity';
import { Repository } from 'typeorm';
import { DialogueService } from 'src/dialogue/dialogue.service';

@Injectable()
export class WritingService {
  constructor(
    @InjectRepository(Writing)
    private readonly writingRepository: Repository<Writing>,
    private readonly dialogueService: DialogueService
  ) {}

  async create(dialogueId: string, createWritingDto: CreateWritingDto) {
    const user = { id: 'me' };
    const dialogue = await this.dialogueService.findDialogueById(dialogueId);

    const writing = this.writingRepository.create({
      writing: createWritingDto.writing,
      user: user,
      dialogue,
    });

    return this.writingRepository.save(writing);
  }

  async findAllByMovieId(movieId: string) {
    const user = { id: 'me' };
    return this.writingRepository.find({
      where: {
        dialogue: {
          scene: {
            movie: {
              id: movieId,
            },
          },
        },
        user: { id: user.id },
      },
      relations: ['dialogue', 'dialogue.scene', 'dialogue.scene.movie'],
    });
  }
}

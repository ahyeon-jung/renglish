import { CreateWritingDto } from './dto/create-writing.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Writing } from './entities/writing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WritingService {
  constructor(
    @InjectRepository(Writing)
    private readonly writingRepository: Repository<Writing>,
  ) { }

  async create(
    userId: string,
    dialogueId: string,
    createWritingDto: CreateWritingDto,
  ): Promise<Writing> {
    const writing = this.writingRepository.create({
      writing: createWritingDto.writing,
      userId,
      dialogueId,
    });

    return this.writingRepository.save(writing);
  }

  async findAllByMovieId(movieId: string): Promise<Writing[]> {
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

  async findByUser(userId: string): Promise<Writing[]> {
    return this.writingRepository.find({
      where: { userId },
      relations: ['dialogue'],
    });
  }
}

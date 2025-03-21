import { CreateWritingDto } from './dto/create-writing.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Writing } from './entities/writing.entity';
import { Repository } from 'typeorm';
import { DialogueService } from 'src/dialogue/dialogue.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class WritingService {
  constructor(
    @InjectRepository(Writing)
    private readonly writingRepository: Repository<Writing>,
    private readonly dialogueService: DialogueService,
    private readonly authService: AuthService
  ) {}

  async create(
    dialogueId: string,
    createWritingDto: CreateWritingDto,
    req: any
  ) {
    const token = req.headers.authorization.split(' ')[1];
    const user = await this.authService.getUserFromToken(token);

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

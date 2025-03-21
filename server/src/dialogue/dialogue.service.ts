import { CreateDialogueDto } from './dto/create-dialogue.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dialogue } from './entities/dialogue.entity';
import { Repository } from 'typeorm';
import { Scene } from 'src/scene/entities/scene.entity';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class DialogueService {
  constructor(
    @InjectRepository(Dialogue)
    private readonly dialogueRepository: Repository<Dialogue>,

    @InjectRepository(Scene)
    private readonly sceneRepository: Repository<Scene>,

    @InjectRepository(Speaker)
    private readonly speakerRepository: Repository<Speaker>,
  ) {}

  async create(createDialogueDto: CreateDialogueDto): Promise<Dialogue> {
    const { sceneId, speakerId } = createDialogueDto;
    const scene = await this.sceneRepository.findOne({
      where: { id: sceneId },
    });
    const speaker = await this.speakerRepository.findOne({
      where: { id: speakerId },
    });

    if (!scene) {
      throw new NotFoundException('Scene not found');
    }
    if (!speaker) {
      throw new NotFoundException('Speaker not found');
    }

    const dialogue = this.dialogueRepository.create({
      english_script: createDialogueDto.english_script,
      korean_script: createDialogueDto.korean_script,
      scene,
      speaker,
    });

    return this.dialogueRepository.save(dialogue);
  }

  async findDialogueById(dialogueId: string) {
    return this.dialogueRepository.findOne({ where: { id: dialogueId } });
  }
}

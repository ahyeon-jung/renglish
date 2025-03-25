import { CreateDialogueDto } from './dto/create-dialogue.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dialogue } from './entities/dialogue.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { SceneService } from 'src/scene/scene.service';
import { SpeakerService } from 'src/speaker/speaker.service';
import { UpdateDialogueDto } from './dto/update-dialogue.dto';

@Injectable()
export class DialogueService {
  constructor(
    @InjectRepository(Dialogue)
    private readonly dialogueRepository: Repository<Dialogue>,
    private readonly sceneService: SceneService,
    private readonly speakerService: SpeakerService,
  ) {}

  async create(
    sceneId: string,
    speakerId: string,
    createDialogueDto: CreateDialogueDto,
  ): Promise<Dialogue> {
    const scene = await this.sceneService.findSceneById(sceneId);
    if (!scene) {
      throw new NotFoundException('Scene not found');
    }

    const speaker = await this.speakerService.findSpeakerById(speakerId);
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

  async update(id: string, updateDialogueDto: UpdateDialogueDto) {
    const dialogue = await this.findDialogueById(id);
    if (!dialogue) {
      throw new NotFoundException(`Dialogue with ID ${id} not found`);
    }

    await this.dialogueRepository.update(id, updateDialogueDto);
    return this.findDialogueById(id);
  }
}

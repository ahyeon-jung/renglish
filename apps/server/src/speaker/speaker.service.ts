import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Scene } from 'src/scene/entities/scene.entity';
import { Repository } from 'typeorm';
import { Speaker } from './entities/speaker.entity';

@Injectable()
export class SpeakerService {
  constructor(
    @InjectRepository(Speaker)
    private readonly speakerRepository: Repository<Speaker>,
    @InjectRepository(Scene)
    private readonly sceneRepository: Repository<Scene>,
  ) { }

  async create(sceneId: string, createSpeakerDto: CreateSpeakerDto): Promise<Speaker> {
    const { speaker_name, speaker_type } = createSpeakerDto;

    const scene = await this.sceneRepository.findOne({
      where: { id: sceneId },
    });
    if (!scene) {
      throw new NotFoundException('Scene not found');
    }

    const speaker = new Speaker();
    speaker.speaker_name = speaker_name;
    speaker.speaker_type = speaker_type;
    speaker.scene = scene;

    return this.speakerRepository.save(speaker);
  }

  async findSpeakers(): Promise<Speaker[]> {
    return this.speakerRepository.find();
  }

  async findSpeakerById(id: string): Promise<Speaker> {
    const speaker = await this.speakerRepository.findOne({
      where: { id },
    });

    if (!speaker) {
      throw new NotFoundException(`Speaker with id ${id} not found`);
    }

    return speaker;
  }

  async update(id: string, updateSpeakerDto: UpdateSpeakerDto): Promise<Speaker> {
    await this.speakerRepository.update(id, updateSpeakerDto);
    return this.findSpeakerById(id);
  }
}

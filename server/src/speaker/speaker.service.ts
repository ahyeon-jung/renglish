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
  ) {}

  async create(createSpeakerDto: CreateSpeakerDto): Promise<Speaker> {
    const { speaker_name, speaker_type, sceneId } = createSpeakerDto;

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

  findOne(id: string) {
    return `This action returns a #${id} speaker`;
  }

  update(id: string, updateSpeakerDto: UpdateSpeakerDto) {
    return `This action updates a #${id} speaker`;
  }
}

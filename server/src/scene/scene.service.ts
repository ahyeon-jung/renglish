import { CreateSceneDto } from './dto/create-scene.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Scene } from './entities/scene.entity';
import { Repository } from 'typeorm';
import { Dialogue } from 'src/dialogue/entities/dialogue.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { MovieService } from 'src/movie/movie.service';
import { SpeakerService } from 'src/speaker/speaker.service';
import { CreateSpeakerDto } from 'src/speaker/dto/create-speaker.dto';

@Injectable()
export class SceneService {
  constructor(
    @InjectRepository(Scene)
    private readonly sceneRepository: Repository<Scene>,
    @InjectRepository(Movie)
    private readonly movieService: MovieService,
    @InjectRepository(Speaker)
    private readonly speakerService: SpeakerService,
    @InjectRepository(Dialogue)
    private readonly dialogueRepository: Repository<Dialogue>
  ) {}

  async create(
    movieId: string,
    createSceneDto: CreateSceneDto
  ): Promise<Scene> {
    const movie = await this.movieService.findOneById(movieId);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const scene = this.sceneRepository.create({
      title: createSceneDto.title,
      description: createSceneDto.description,
      movie,
    });
    await this.sceneRepository.save(scene);

    for (const speakerDto of createSceneDto.speakers) {
      await this.speakerService.create({
        speaker_name: speakerDto.speaker_name,
        speaker_type: speakerDto.speaker_type,
        sceneId: scene.id,
      });
    }

    for (const dialogueDto of createSceneDto.dialogues) {
      const dialogue = this.dialogueRepository.create({
        english_script: dialogueDto.english_script,
        korean_script: dialogueDto.korean_script,
        scene,
      });
      await this.dialogueRepository.save(dialogue);
    }

    return scene;
  }

  async createSpeakers(
    sceneId: string,
    createSpeakerDto: CreateSpeakerDto
  ): Promise<Speaker> {
    const scene = this.findSceneById(sceneId);
    if (!scene) {
      throw new NotFoundException('Scene not found');
    }

    return this.speakerService.create({
      speaker_name: createSpeakerDto.speaker_name,
      speaker_type: createSpeakerDto.speaker_type,
      sceneId,
    });
  }

  async findSceneById(sceneId: string): Promise<Scene> {
    const scene = await this.sceneRepository.findOne({
      where: { id: sceneId },
      relations: ['speakers', 'dialogues'],
    });
    if (!scene) {
      throw new NotFoundException('Scene not found');
    }

    return scene;
  }

  async findSpeakersBySceneId(sceneId: string): Promise<Speaker[]> {
    const scene = await this.sceneRepository.findOne({
      where: { id: sceneId },
      relations: ['speakers'],
    });
    if (!scene) {
      throw new NotFoundException('Scene not found');
    }

    return scene.speakers || [];
  }
}

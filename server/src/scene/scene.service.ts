import { CreateSceneDto } from './dto/create-scene.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Scene } from './entities/scene.entity';
import { Repository } from 'typeorm';
import { Dialogue } from 'src/dialogue/entities/dialogue.entity';
import { Movie } from 'src/movie/entities/movie.entity';

@Injectable()
export class SceneService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Scene)
    private readonly sceneRepository: Repository<Scene>,
    @InjectRepository(Speaker)
    private readonly speakerRepository: Repository<Speaker>,
    @InjectRepository(Dialogue)
    private readonly dialogueRepository: Repository<Dialogue>
  ) {}

  async create(
    movieId: string,
    createSceneDto: CreateSceneDto
  ): Promise<Scene> {
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });
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
      const speaker = this.speakerRepository.create({
        speaker_name: speakerDto.speaker_name,
        speaker_type: speakerDto.speaker_type,
        scene,
      });
      await this.speakerRepository.save(speaker);
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

import { CreateSceneDto } from './dto/create-scene.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Scene } from './entities/scene.entity';
import { Repository } from 'typeorm';
import { Movie } from 'src/movie/entities/movie.entity';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class SceneService {
  constructor(
    @InjectRepository(Scene)
    private readonly sceneRepository: Repository<Scene>,
    @InjectRepository(Movie)
    private readonly movieService: MovieService,
  ) {}

  async create(movieId: string, createSceneDto: CreateSceneDto): Promise<Scene> {
    const movie = await this.movieService.findOneById(movieId);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const scene = this.sceneRepository.create({
      title: createSceneDto.title,
      description: createSceneDto.description,
      movie,
    });

    return await this.sceneRepository.save(scene);
  }

  async delete(sceneId: string): Promise<void> {
    const scene = await this.findSceneById(sceneId);
    if (!scene) {
      throw new NotFoundException('Scene not found');
    }

    await this.sceneRepository.remove(scene);
  }

  async findAllScene(): Promise<Scene[]> {
    return this.sceneRepository.find();
  }

  async findSceneById(sceneId: string): Promise<Scene> {
    const scene = await this.sceneRepository.findOne({
      where: { id: sceneId },
      relations: ['speakers', 'dialogues', 'dialogues.speaker'],
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

import { CreateSceneDto } from './dto/create-scene.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Scene } from './entities/scene.entity';
import { DeleteResult, Like, Repository } from 'typeorm';
import { Movie } from 'src/movie/entities/movie.entity';
import { MovieService } from 'src/movie/movie.service';
import { findAllWithPagination} from 'src/common/utils/pagination.util';
import { SearchParams } from 'src/common/dto/search-params.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';
import { StudyService } from 'src/study/study.service';
import { FilteredScene } from './types/filtered-scene';
import { PaginationSceneResponseDto } from './dto/pagination-scene.dto';

@Injectable()
export class SceneService {
  constructor(
    @InjectRepository(Scene)
    private readonly sceneRepository: Repository<Scene>,
    @InjectRepository(Movie)
    private readonly movieService: MovieService,
    private readonly studyService: StudyService,
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
      audioUrl: createSceneDto.audioUrl,
    });

    return await this.sceneRepository.save(scene);
  }

  async delete(sceneId: string): Promise<DeleteResult> {
    const scene = await this.findOneEntity(sceneId);
    if (!scene) {
      throw new NotFoundException('Scene not found');
    }

    return this.sceneRepository.delete(scene);
  }

  async findAllScene(params: SearchParams): Promise<PaginationSceneResponseDto> {
    const { keyword, offset, limit } = params;

    const whereCondition = keyword
      ? [{ title: Like(`%${keyword}%`) }, { description: Like(`%${keyword}%`) }]
      : {};

    const data = await findAllWithPagination(this.sceneRepository, whereCondition, ['speakers'], {
      offset,
      limit,
    });

    return { ...data, data: data.data.map((scene) => ({ ...scene, audioUrl: null })) };
  }

  async findOneEntity(id: string): Promise<Scene> {
    const scene = await this.sceneRepository.findOne({
      where: { id },
      relations: ['speakers', 'dialogues', 'dialogues.speaker'],
    });
    if (!scene) throw new NotFoundException('Scene not found');
    return scene;
  }

  async findSceneById(sceneId: string, userId?: string): Promise<FilteredScene> {
    const scene = await this.sceneRepository.findOne({
      where: { id: sceneId },
      relations: [
        'speakers',
        'dialogues',
        'dialogues.speaker',
        'study',
        'study.participants',
        'expressions',
      ],
      order: {
        dialogues: {
          order: 'ASC',
        },
      },
    });
    if (!scene) {
      throw new NotFoundException('Scene not found');
    }

    const isParticipant = userId
      ? scene.study?.participants?.some((user) => user.id === userId)
      : false;

    return {
      id: scene.id,
      title: scene.title,
      audioUrl: isParticipant ? scene.audioUrl : null,
      speakers: scene.speakers,
      dialogues: scene.dialogues,
      expressions: scene.expressions,
    };
  }

  async addStudy({ sceneId, studyId }: { sceneId: string; studyId: string }): Promise<Scene> {
    const scene = await this.findOneEntity(sceneId);

    const study = await this.studyService.findOneEntity(studyId);
    if (!study) {
      throw new NotFoundException('Study not found');
    }

    scene.study = study;

    await this.sceneRepository.save(scene);

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

  async update(id: string, updateSceneDto: UpdateSceneDto): Promise<FilteredScene> {
    const scene = await this.findSceneById(id);
    if (!scene) {
      throw new NotFoundException(`Scene with ID ${id} not found`);
    }

    await this.sceneRepository.update(id, updateSceneDto);
    return this.findSceneById(id);
  }
}

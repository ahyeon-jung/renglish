import { CreateMovieDto } from './dto/create-movie.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Like, Repository } from 'typeorm';
import { findAllWithPagination, PaginationResponse } from 'src/common/utils/pagination.util';
import { SearchMovieParams } from './dto/search-movie.dto';
import { MovieWithSimplifiedScenes } from './types/filtered-scene';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieRepository.save(createMovieDto);
  }

  async findAll(params: SearchMovieParams): Promise<PaginationResponse<MovieWithSimplifiedScenes>> {
    const { category, keyword, offset, limit } = params;

    let whereCondition: any = {};

    if (category && keyword) {
      whereCondition = [
        { category: category, title: Like(`%${keyword}%`) },
        { category: category, description: Like(`%${keyword}%`) },
      ];
    } else if (category) {
      whereCondition = { category: category };
    } else if (keyword) {
      whereCondition = [{ title: Like(`%${keyword}%`) }, { description: Like(`%${keyword}%`) }];
    }

    const data = await findAllWithPagination(
      this.movieRepository,
      whereCondition,
      ['scenes.study'],
      {
        offset,
        limit,
      },
      { scenes: { study: { studiedAt: 'DESC' } } },
    );

    return {
      ...data,
      data: data.data.map((movie) => ({
        ...movie,
        scenes: movie.scenes.map((scene) => ({ id: scene.id, title: scene.title })),
      })),
    };
  }

  async findMovieWithLatestScene(): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: {},
      relations: ['scenes'],
      order: {
        scenes: { createdAt: 'DESC' },
      },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async findOneById(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['scenes'],
    });
    if (!movie) {
      throw new Error(`Movie with id ${id} not found`);
    }
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['scenes'],
    });
    if (!movie) {
      throw new Error(`Movie with id ${id} not found`);
    }

    movie.title = updateMovieDto.title ?? movie.title;
    movie.description = updateMovieDto.description ?? movie.description;

    return this.movieRepository.save(movie);
  }

  async updateImage(id: string, imageUrl: string): Promise<Movie> {
    const movie = await this.findOneById(id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    await this.movieRepository.update(id, { imageUrl });
    return this.findOneById(id);
  }

  async remove(id: string): Promise<void> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['scenes'],
    });
    if (!movie) {
      throw new Error(`Movie with id ${id} not found`);
    }

    await this.movieRepository.remove(movie);
  }
}

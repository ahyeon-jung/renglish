import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find({ relations: ['scenes'] });
  }

  async create(title: string, description: string): Promise<Movie> {
    const movie = new Movie();
    movie.title = title;
    movie.description = description;

    return this.movieRepository.save(movie);
  }
}

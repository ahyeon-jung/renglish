import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { Movie } from './entities/movie.entity';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieService.create(
      createMovieDto.title,
      createMovieDto.description,
    );
  }
}

import { CreateMovieDto } from "./dto/create-movie.dto";
import { Injectable } from "@nestjs/common";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "./entities/movie.entity";
import { Repository } from "typeorm";

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = new Movie();
    movie.title = createMovieDto.title;
    movie.description = createMovieDto.description;

    return this.movieRepository.save(movie);
  }

  findAll(): Promise<Movie[]> {
    return this.movieRepository.find({ relations: ["scenes"] });
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ["scenes"],
    });
    if (!movie) {
      throw new Error(`Movie with id ${id} not found`);
    }
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ["scenes"],
    });
    if (!movie) {
      throw new Error(`Movie with id ${id} not found`);
    }

    movie.title = updateMovieDto.title ?? movie.title;
    movie.description = updateMovieDto.description ?? movie.description;

    return this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<void> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ["scenes"],
    });
    if (!movie) {
      throw new Error(`Movie with id ${id} not found`);
    }

    await this.movieRepository.remove(movie);
  }
}

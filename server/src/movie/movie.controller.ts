import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MovieService } from "./movie.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { Movie } from "./entities/movie.entity";

@ApiTags("Movies")
@Controller("movie")
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiOperation({ summary: "Create a new movie" })
  @ApiResponse({
    status: 201,
    description: "The movie has been successfully created.",
    type: Movie,
  })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all movies" })
  @ApiResponse({
    status: 200,
    description: "List of all movies.",
    type: [Movie],
  })
  findAll() {
    return this.movieService.findAll();
  }

  @Get(":movieId")
  @ApiOperation({ summary: "Get a movie by ID" })
  @ApiParam({
    name: "movieId",
    description: "The unique identifier of the movie",
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: "The movie with the given ID.",
    type: Movie,
  })
  @ApiResponse({
    status: 404,
    description: "Movie not found",
  })
  findOne(@Param("movieId") movieId: string) {
    return this.movieService.findOne(+movieId);
  }

  @Patch(":movieId")
  @ApiOperation({ summary: "Update a movie" })
  @ApiParam({
    name: "movieId",
    description: "The unique identifier of the movie to update",
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: "The updated movie.",
    type: Movie,
  })
  @ApiResponse({
    status: 404,
    description: "Movie not found",
  })
  update(
    @Param("movieId") movieId: string,
    @Body() updateMovieDto: UpdateMovieDto
  ) {
    return this.movieService.update(+movieId, updateMovieDto);
  }

  @Delete(":movieId")
  @ApiOperation({ summary: "Delete a movie by ID" })
  @ApiParam({
    name: "movieId",
    description: "The unique identifier of the movie to delete",
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: "The movie has been successfully deleted.",
  })
  @ApiResponse({
    status: 404,
    description: "Movie not found",
  })
  remove(@Param("movieId") movieId: string) {
    return this.movieService.remove(+movieId);
  }
}

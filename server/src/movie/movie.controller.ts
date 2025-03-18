import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';
import { CreateSceneDto } from 'src/scene/dto/create-scene.dto';
import { SceneService } from 'src/scene/scene.service';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly sceneService: SceneService
  ) {}

  @Post()
  @ApiOperation({
    summary: '영화 정보 생성',
    description: '새로운 영화 정보를 생성합니다.',
  })
  @ApiResponse({ status: 201, description: '영화 정보 생성 성공' })
  @ApiBody({ type: CreateMovieDto })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get('latest')
  @ApiOperation({
    summary: '가장 최신 영화 가져오기',
    description: '가장 최신 업로드된 장면의 영화 정보를 가져옵니다.',
  })
  findLatestScene(): Promise<Movie> {
    return this.movieService.findMovieWithLatestScene();
  }

  @Get()
  @ApiOperation({
    summary: '모든 영화 정보 가져오기',
    description: '모든 영화 정보를 가져옵니다.',
  })
  @ApiResponse({ status: 200, description: '모든 영화 정보 가져오기 성공' })
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get(':movieId')
  @ApiOperation({
    summary: '영화 아이디로 영화 정보 찾기',
    description: '영화 아이디로 영화화 정보를 가져옵니다.',
  })
  @ApiParam({
    name: 'movieId',
    description: '영화의 ID',
    example: '6ef26cb3-746c-4df1-90e0-66805f3f8320',
    type: String,
  })
  @ApiResponse({ status: 200, description: '영화 정보 찾기 성공' })
  @ApiResponse({ status: 404, description: '영화 정보 찾기 실패' })
  findOne(@Param('movieId') movieId: string) {
    return this.movieService.findOneById(movieId);
  }

  @Delete(':movieId')
  @ApiOperation({
    summary: '영화 정보삭제',
    description: '영화 아이디로 영화화 정보를 삭제합합니다.',
  })
  @ApiParam({
    name: 'movieId',
    description: '영화의 ID',
    example: '6ef26cb3-746c-4df1-90e0-66805f3f8320',
    type: String,
  })
  @ApiResponse({ status: 200, description: '영화 정보 삭제 성공' })
  remove(@Param('movieId') movieId: string) {
    return this.movieService.remove(movieId);
  }

  @Post(':movieId/scene')
  @ApiOperation({
    summary: '영화에 장면 한꺼번에 추가하기',
    description: '해당 영화에 장면 및 대본을 추가합니다.',
  })
  @ApiParam({
    name: 'movieId',
    description: '영화의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  @ApiResponse({ status: 201, description: '장면 추가 성공' })
  @ApiBody({ type: CreateSceneDto })
  addScene(
    @Param('movieId') movieId: string,
    @Body() createSceneDto: CreateSceneDto
  ) {
    return this.sceneService.create(movieId, createSceneDto);
  }
}

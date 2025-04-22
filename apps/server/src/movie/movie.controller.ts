import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';
import { UpdateMovieImageDto } from './dto/update-movie.dto';
import { TAG } from 'src/common/constants/tag';
import { AdminTokenGuard } from 'src/auth/guards/admin-token.guard';
import { PaginationResponse } from 'src/common/utils/pagination.util';
import { MovieWithSimplifiedScenes } from './types/filtered-scene';
import { PaginationMovieResponseDto } from './dto/pagination-movie.dto';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Post()
  @UseGuards(AdminTokenGuard)
  @ApiOperation({
    summary: `영화 정보 생성 ${TAG.TOKEN_REQUIRED}`,
    description: '새로운 영화 정보를 생성합니다.',
  })
  @ApiOkResponse({ type: Movie })
  @ApiResponse({ status: 201, description: '영화 정보 생성 성공' })
  @ApiBody({ type: CreateMovieDto })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Put('/:movieId')
  @UseGuards(AdminTokenGuard)
  @ApiOperation({
    summary: `영화 이미지 추가 ${TAG.TOKEN_REQUIRED}`,
    description: '영화 이미지를 추가합니다.',
  })
  @ApiOkResponse({ type: Movie })
  @ApiParam({
    name: 'movieId',
    description: '영화의 ID',
    example: '6ef26cb3-746c-4df1-90e0-66805f3f8320',
    type: String,
  })
  @ApiBody({ type: UpdateMovieImageDto })
  updateImageUrl(@Param('movieId') movieId: string, @Body() createMovieDto: UpdateMovieImageDto) {
    return this.movieService.updateImage(movieId, createMovieDto.imageUrl);
  }

  @Get('/latest')
  @ApiQuery({
    name: 'limit',
    description: '가져올 영화 개수',
    example: 1,
    type: Number,
    required: false,
  })
  @ApiOperation({
    summary: '가장 최신 영화 가져오기',
    description: '가장 최신 업로드된 장면의 영화 정보를 가져옵니다.',
  })
  @ApiOkResponse({ type: Movie, isArray: true })
  findLatestScene(@Query('limit') limit: number = 1): Promise<Movie[]> {
    return this.movieService.findMovieWithLatestScene(limit);
  }

  @Get()
  @ApiOperation({
    summary: '모든 영화 정보 가져오기',
    description: '모든 영화 정보를 가져옵니다.',
  })
  @ApiQuery({
    name: 'keyword',
    description: '제목과 설명에서 검색할 키워드를 입력하세요.',
    example: 'before',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'category',
    description: '영화의 카테고리를 입력하세요.',
    example: 'romance',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    description: '가져올 페이지 번호 (기본값: 1)',
    example: 1,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    description: '한 페이지에 가져올 데이터 개수 (기본값: 10)',
    example: 10,
    type: Number,
  })
  @ApiOkResponse({ type: () => PaginationMovieResponseDto })
  async findAll(
    @Query('category') category?: string,
    @Query('keyword') keyword?: string,
    @Query('offset') offset: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PaginationResponse<MovieWithSimplifiedScenes>> {
    return this.movieService.findAll({ category, keyword, offset, limit });
  }

  @Get(':movieId')
  @ApiOperation({
    summary: '영화 아이디로 영화 정보 찾기',
    description: '영화 아이디로 영화화 정보를 가져옵니다.',
  })
  @ApiOkResponse({ type: Movie })
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
  @UseGuards(AdminTokenGuard)
  @ApiOperation({
    summary: `영화 정보 삭제 ${TAG.TOKEN_REQUIRED}`,
    description: '영화 아이디로 영화화 정보를 삭제합니다.',
  })
  @ApiOkResponse({ type: Movie })
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
}

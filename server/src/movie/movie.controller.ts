import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';
import { SceneService } from 'src/scene/scene.service';
import { PaginationResponse } from 'src/common/utils/pagination.util';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly sceneService: SceneService,
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
  @ApiResponse({
    status: 200,
    description: '모든 영화 정보 가져오기 성공',
    schema: {
      example: {
        statusCode: 200,
        message: 'Request successful',
        data: {
          data: [
            {
              id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
              createdAt: '2025-03-26T10:15:30.123Z',
              updatedAt: '2025-03-26T10:15:30.123Z',
              deletedAt: null,
              title: 'La La Land',
              imageUrl: 'https://example.com/image1.jpg',
              description: 'A beautiful musical romance film',
              scenes: [
                {
                  id: '111aaa22-bb33-cc44-dd55-eeeeffff0000',
                  createdAt: '2025-03-26T10:20:45.456Z',
                  updatedAt: '2025-03-26T10:20:45.456Z',
                  deletedAt: null,
                  title: 'Opening Dance Sequence',
                  studiedAt: '2025-03-26T18:00:00.000Z',
                  description: 'A vibrant opening number on a freeway',
                },
              ],
            },
            {
              id: '1234abcd-5678-ef90-ghij-klmnopqrstuv',
              createdAt: '2025-03-26T11:05:40.789Z',
              updatedAt: '2025-03-26T11:05:40.789Z',
              deletedAt: null,
              title: 'Inception',
              imageUrl: 'https://example.com/image2.jpg',
              description: 'A mind-bending thriller by Christopher Nolan',
              scenes: [
                {
                  id: 'aa11bb22-cc33-dd44-ee55-ff66gg77hh88',
                  createdAt: '2025-03-26T11:10:50.987Z',
                  updatedAt: '2025-03-26T11:10:50.987Z',
                  deletedAt: null,
                  title: 'The Spinning Top',
                  studiedAt: '2025-03-26T19:30:00.000Z',
                  description: 'The final scene with the spinning top',
                },
              ],
            },
          ],
          totalCount: 11,
          currentPage: 1,
          totalPages: 6,
        },
      },
    },
  })
  async findAll(
    @Query('category') category?: string,
    @Query('keyword') keyword?: string,
    @Query('offset') offset: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PaginationResponse<Movie>> {
    return this.movieService.findAll({ category, keyword, offset, limit });
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
}

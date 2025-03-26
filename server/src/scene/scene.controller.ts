import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { SceneService } from './scene.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { Scene } from './entities/scene.entity';
import { CreateSceneDto } from './dto/create-scene.dto';
import { PaginationResponse } from 'src/common/utils/pagination.util';
@ApiTags('Scenes')
@Controller('scenes')
export class SceneController {
  constructor(private readonly sceneService: SceneService) {}

  @Post(':movieId')
  @ApiParam({
    name: 'movieId',
    description: '영화의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  @ApiOperation({
    summary: '장면 정보 생성하기',
    description: '새로운 장면 정보를 생성합니다.',
  })
  @ApiBody({ type: CreateSceneDto })
  createScene(@Param('movieId') movieId: string, @Body() createSpeakerDto: CreateSceneDto) {
    return this.sceneService.create(movieId, createSpeakerDto);
  }

  @Get('')
  @ApiOperation({
    summary: '모든 장면 가져오기',
    description: '모든 장면면을 가져옵니다.',
  })
  @ApiQuery({
    name: 'keyword',
    description: '제목과 설명에서 검색할 키워드를 입력하세요.',
    example: 'you',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    description: '가져올 페이지 번호 (기본값: 1)',
    example: 1,
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: '한 페이지에 가져올 데이터 개수 (기본값: 10)',
    example: 10,
    type: Number,
    required: false,
  })
  async findAllScene(
    @Query('keyword') keyword?: string,
    @Query('offset') offset: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PaginationResponse<Scene>> {
    return this.sceneService.findAllScene(keyword, offset, limit);
  }

  @Get(':sceneId')
  @ApiOperation({
    summary: '장면 및 대본 가져오기',
    description: '장면 정보와 해당 장면의 대본을 가져옵니다.',
  })
  @ApiParam({
    name: 'sceneId',
    description: '장면의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  findSceneById(@Param('sceneId') sceneId: string): Promise<Scene> {
    return this.sceneService.findSceneById(sceneId);
  }

  @Get(':sceneId/speakers')
  @ApiOperation({
    summary: '장면 발화자 가져오기',
    description: '장면 아이디로 모든 발화자를 가져옵니다.',
  })
  @ApiParam({
    name: 'sceneId',
    description: '장면의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  findAll(@Param('sceneId') sceneId: string): Promise<Speaker[]> {
    return this.sceneService.findSpeakersBySceneId(sceneId);
  }

  @Delete(':sceneId')
  @ApiOperation({
    summary: '장면 삭제하기',
    description: '장면 정보 및 연결된 발화자, 대사를 삭제합니다.',
  })
  @ApiParam({
    name: 'sceneId',
    description: '장면의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  async deleteScene(@Param('sceneId') sceneId: string) {
    return await this.sceneService.delete(sceneId);
  }
}

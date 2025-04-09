import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SceneService } from './scene.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { Scene } from './entities/scene.entity';
import { CreateSceneDto } from './dto/create-scene.dto';
import { PaginationResponse } from 'src/common/utils/pagination.util';
import { UpdateSceneDto } from './dto/update-scene.dto';
import { TAG } from 'src/common/constants/tag';
import { CreateStudyDto } from 'src/study/dto/create-study.dto';
import { StudyService } from 'src/study/study.service';
import { OptionalTokenGuard } from 'src/auth/guards/optional-token.guard';
@ApiTags('Scenes')
@Controller('scenes')
export class SceneController {
  constructor(
    private readonly sceneService: SceneService,
    private readonly studyService: StudyService,
  ) {}

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

  @Post('/:sceneId/study')
  @ApiParam({
    name: 'sceneId',
    description: '장면의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  @ApiOperation({
    summary: `스터디 생성하기  ${TAG.ADMIN_REQUIRED}`,
    description: '새로운 스터디를 생성합니다.',
  })
  @ApiBody({ type: CreateStudyDto })
  create(@Param('sceneId') sceneId: string, @Body() createStudyDto: CreateStudyDto) {
    return this.studyService.create(sceneId, createStudyDto);
  }

  @Post('/:sceneId/study/:studyId')
  @ApiParam({
    name: 'sceneId',
    description: '장면의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  @ApiParam({
    name: 'studyId',
    description: '스터디의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  @ApiOperation({
    summary: `장면에 스터디 추가하기  ${TAG.ADMIN_REQUIRED}`,
    description: '장면에 스터디 추가하기',
  })
  addStudy(@Param('sceneId') sceneId: string, @Param('studyId') studyId: string) {
    return this.sceneService.addStudy({ sceneId, studyId });
  }

  @Put('/:sceneId')
  @ApiParam({
    name: 'sceneId',
    description: '장면의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  @ApiOperation({
    summary: '장면 정보 변경하기',
    description: '장면 정보를 변경합니다.',
  })
  @ApiBody({ type: UpdateSceneDto })
  updateDialogue(@Param('sceneId') sceneId: string, @Body() updateSceneDto: UpdateSceneDto) {
    return this.sceneService.update(sceneId, updateSceneDto);
  }

  @Get('')
  @ApiOperation({
    summary: '모든 장면 가져오기',
    description: '모든 장면면을 가져옵니다(audioUrl 제외).',
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
  })
  @ApiQuery({
    name: 'limit',
    description: '한 페이지에 가져올 데이터 개수 (기본값: 10)',
    example: 10,
    type: Number,
  })
  async findAllScene(
    @Query('keyword') keyword?: string,
    @Query('offset') offset: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PaginationResponse<Scene>> {
    return this.sceneService.findAllScene({ keyword, offset, limit });
  }

  @Get(':sceneId')
  @UseGuards(OptionalTokenGuard)
  @ApiOperation({
    summary: '장면 및 대본 가져오기',
    description: `장면 정보와 해당 장면의 대본을 가져옵니다.
    <br/>로그인 유저가 참여자인 경우 audioUrl을 반환합니다.`,
  })
  @ApiParam({
    name: 'sceneId',
    description: '장면의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  findSceneById(@Param('sceneId') sceneId: string, @Request() req) {
    const userId = (req.user as any)?.id ?? null;
    return this.sceneService.findSceneById(sceneId, userId);
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

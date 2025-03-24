import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SceneService } from './scene.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { Scene } from './entities/scene.entity';
import { CreateSpeakerDto } from 'src/speaker/dto/create-speaker.dto';
import { CreateSceneDto } from './dto/create-scene.dto';
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
}

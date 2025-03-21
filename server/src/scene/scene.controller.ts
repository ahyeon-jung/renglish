import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SceneService } from './scene.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { Scene } from './entities/scene.entity';
import { CreateSpeakerDto } from 'src/speaker/dto/create-speaker.dto';
@ApiTags('Scenes')
@Controller('scenes')
export class SceneController {
  constructor(private readonly sceneService: SceneService) {}

  @Post(':sceneId/speakers')
  @ApiOperation({
    summary: '장면에 발화자 추가하기',
    description: '장면에 발화자 정보를 추가하고 모든 발화자를 반환합니다다.',
  })
  @ApiParam({
    name: 'sceneId',
    description: '장면의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  async createSpeakers(
    @Param('sceneId') sceneId: string,
    @Body() createSpeakerDto: CreateSpeakerDto,
  ): Promise<Speaker> {
    return this.sceneService.createSpeakers(sceneId, createSpeakerDto);
  }

  @Get(':sceneId')
  @ApiOperation({
    summary: '장면 가져오기',
    description: '장면 정보를 가져옵니다.',
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

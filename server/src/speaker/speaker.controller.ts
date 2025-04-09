import { Controller, Get, Body, Param, Put, Post, UseGuards } from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { AdminTokenGuard } from 'src/auth/guards/admin-token.guard';
import { TAG } from 'src/common/constants/tag';

@ApiTags('Speakers')
@Controller('speakers')
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  @Post(':sceneId')
  @UseGuards(AdminTokenGuard)
  @ApiParam({
    name: 'sceneId',
    description: '장면의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  @ApiOperation({
    summary: `발화자 정보 생성 ${TAG.ADMIN_REQUIRED}`,
    description: '새로운 발화자 정보를 생성합니다.',
  })
  @ApiResponse({ status: 201, description: '발화자 정보 생성 성공' })
  @ApiBody({ type: CreateSpeakerDto })
  createSpeaker(@Param('sceneId') sceneId: string, @Body() createSpeakerDto: CreateSpeakerDto) {
    return this.speakerService.create(sceneId, createSpeakerDto);
  }

  @Get(':speakerId')
  @ApiOperation({
    summary: '발화자 정보 가져오기',
    description: '발화자 정보를 발화자 정보를 가져옵니다.',
  })
  @ApiParam({
    name: 'speakerId',
    description: '발화자의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  findOne(@Param('speakerId') speakerId: string) {
    return this.speakerService.findSpeakerById(speakerId);
  }

  @Put(':speakerId')
  @UseGuards(AdminTokenGuard)
  @ApiOperation({
    summary: `발화자 정보 변경하기 ${TAG.ADMIN_REQUIRED}`,
    description: '발화자 정보를 변경합니다.',
  })
  @ApiParam({
    name: 'speakerId',
    description: '발화자의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  update(@Param('speakerId') speakerId: string, @Body() updateSpeakerDto: UpdateSpeakerDto) {
    return this.speakerService.update(speakerId, updateSpeakerDto);
  }
}

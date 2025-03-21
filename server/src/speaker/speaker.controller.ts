import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Speakers')
@Controller('speakers')
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

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
    return this.speakerService.findOne(speakerId);
  }

  @Put(':speakerId')
  @ApiOperation({
    summary: '발화자 정보 변경하기',
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

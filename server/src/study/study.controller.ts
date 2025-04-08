import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
  Put,
} from '@nestjs/common';
import { StudyService } from './study.service';
import { UpdateStudyDto } from './dto/update-study.dto';

import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TAG } from 'src/common/constants/tag';
import { STUDY_STATUS } from './enums/study-status.enum';

@ApiTags('Study')
@Controller('studies')
export class StudyController {
  constructor(private readonly studyService: StudyService) {}

  @Get()
  @ApiQuery({
    name: 'status',
    description: `스터디의 진행 상황을 입력하세요 ${STUDY_STATUS.RECRUITING} ${STUDY_STATUS.COMPLETED}`,
    example: `${STUDY_STATUS.COMPLETED}`,
    type: String,
    required: false,
  })
  @ApiOperation({
    summary: '스터디 목록 조회하기',
    description: '스터디 목록을 조회합니다.',
  })
  findAll(@Query('status') status?: string) {
    return this.studyService.findAll(status);
  }

  @Get(':studyId')
  @ApiParam({
    name: 'studyId',
    description: '스터디의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  @ApiOperation({
    summary: '스터디 조회하기',
    description: '스터디를 조회합니다.',
  })
  findOne(@Param('studyId') id: string) {
    return this.studyService.findOne(id);
  }

  @Put(':studyId')
  @ApiParam({
    name: 'studyId',
    description: '스터디의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  @ApiOperation({
    summary: `스터디 수정하기 ${TAG.ADMIN_REQUIRED}`,
    description: '스터디를 수정합니다.',
  })
  update(@Param('studyId') id: string, @Body() updateStudyDto: UpdateStudyDto) {
    return this.studyService.update(id, updateStudyDto);
  }

  @Delete(':studyId')
  @ApiParam({
    name: 'studyId',
    description: '스터디의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  @ApiOperation({
    summary: `스터디 삭제하기 ${TAG.ADMIN_REQUIRED}`,
    description: '스터디를 삭제합니다.',
  })
  remove(@Param('studyId') id: string) {
    return this.studyService.remove(id);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':studyId/is-member')
  @ApiOperation({
    summary: '스터디 참여자 여부 조회하기',
    description: '스터디에 참여중인지 조회합니다.',
  })
  isMember(@Param('studyId') studyId: string, @Request() req) {
    const userId = req.user['id'];
    return this.studyService.isMember(studyId, userId);
  }

  @Get('my')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: `내 스터디 모두 조회하기 ${TAG.TOKEN_REQUIRED}`,
    description: '참여중인 스터디를를 조회합니다.',
  })
  findMyStudies(@Request() req) {
    const userId = req.user['id'];
    return this.studyService.findByUser(userId);
  }

  @Post(':studyId/add-applicant')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: `스터디 지원하기  ${TAG.TOKEN_REQUIRED}`,
    description: '스터디에 참여중인지 조회합니다(applicant).',
  })
  addApplicant(@Param('studyId') studyId: string, @Request() req) {
    const userId = req.user['id'];
    return this.studyService.addApplicants(studyId, userId);
  }

  @Delete(':id/remove-member')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: `스터디 지원 취소하기  ${TAG.TOKEN_REQUIRED}`,
    description: '스터디에 참여중인지 조회합니다(applicant).',
  })
  removeApplicant(@Param('id') studyId: string, @Param('userId') userId: string) {
    return this.studyService.removeMember(studyId, userId);
  }

  @Post(':studyId/add-participant/:userId')
  @ApiParam({
    name: 'studyId',
    description: '스터디의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  @ApiParam({
    name: 'userId',
    description: '사용자의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  @ApiOperation({
    summary: `스터디 참여 수락하기  ${TAG.ADMIN_REQUIRED}`,
    description: '스터디 참여자를 수락합니다(participant).',
  })
  addParticipant(@Param('studyId') studyId: string, @Param('userId') userId: string) {
    return this.studyService.addParticipants(studyId, userId);
  }

  @Delete(':studyId/remove-member')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: `스터디 참여 취소하기  ${TAG.ADMIN_REQUIRED}`,
    description: '스터디 참여 취소하기(participant).',
  })
  removeMember(@Param('studyId') studyId: string, @Param('userId') userId: string) {
    return this.studyService.removeMember(studyId, userId);
  }
}

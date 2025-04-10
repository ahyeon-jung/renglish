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
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TAG } from 'src/common/constants/tag';
import { STUDY_STATUS } from './enums/study-status.enum';
import { AdminTokenGuard } from 'src/auth/guards/admin-token.guard';
import { Study } from './entities/study.entity';
import { PaginationResponse } from 'src/common/utils/pagination.util';
import { ExtendedFilteredStudy } from './types/filtered-study';
import { DeleteResult } from 'typeorm';

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
  @ApiOperation({
    summary: '스터디 목록 조회하기',
    description: '스터디 목록을 조회합니다.',
  })
  findAll(
    @Query('status') status?: string,
    @Query('offset') offset: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PaginationResponse<ExtendedFilteredStudy>> {
    return this.studyService.findAll({ status, offset, limit });
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
  findOne(@Param('studyId') id: string): Promise<ExtendedFilteredStudy> {
    return this.studyService.findOne(id);
  }

  @Put(':studyId')
  @UseGuards(AdminTokenGuard)
  @ApiOperation({
    summary: `스터디 수정하기 ${TAG.ADMIN_REQUIRED}`,
    description: '스터디를 수정합니다.',
  })
  @ApiParam({
    name: 'studyId',
    description: '스터디의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  update(@Param('studyId') id: string, @Body() updateStudyDto: UpdateStudyDto): Promise<Study> {
    return this.studyService.update(id, updateStudyDto);
  }

  @Delete(':studyId')
  @UseGuards(AdminTokenGuard)
  @ApiOperation({
    summary: `스터디 삭제하기 ${TAG.ADMIN_REQUIRED}`,
    description: '스터디를 삭제합니다.',
  })
  @ApiParam({
    name: 'studyId',
    description: '스터디의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  remove(@Param('studyId') id: string): Promise<DeleteResult> {
    return this.studyService.remove(id);
  }

  @Post(':studyId/add-applicant')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: `스터디 지원하기  ${TAG.TOKEN_REQUIRED}`,
    description: '스터디에 참여중인지 조회합니다(applicant).',
  })
  @ApiOkResponse({ type: Study })
  addApplicant(@Param('studyId') studyId: string, @Request() req): Promise<Study> {
    const userId = req.user['id'];
    return this.studyService.addApplicants(studyId, userId);
  }

  @Delete(':studyId/remove-applicant')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: `스터디 지원 취소하기  ${TAG.TOKEN_REQUIRED}`,
    description: '토큰 유저가 스터디 지원을 취소합니다(applicant).',
  })
  @ApiOkResponse({ type: Study })
  removeApplicant(@Param('studyId') studyId: string, @Request() req): Promise<Study> {
    const userId = req.user['id'];
    return this.studyService.removeApplicant(studyId, userId);
  }

  @Delete(':studyId/remove-applicant/:userId')
  @UseGuards(AdminTokenGuard)
  @ApiOperation({
    summary: `스터디 지원자 취소하기  ${TAG.ADMIN_REQUIRED}`,
    description: '관리자가 스터디 지원자를 제거합니다(applicant).',
  })
  @ApiOkResponse({ type: Study })
  removeApplicantByAdmin(
    @Param('studyId') studyId: string,
    @Param('userId') userId: string,
  ): Promise<Study> {
    return this.studyService.removeApplicant(studyId, userId);
  }

  @Post(':studyId/add-participant/:userId')
  @UseGuards(AdminTokenGuard)
  @ApiOperation({
    summary: `스터디 참여 수락하기  ${TAG.ADMIN_REQUIRED}`,
    description: '스터디 참여자를 수락합니다(participant).',
  })
  @ApiOkResponse({ type: Study })
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
  addParticipant(
    @Param('studyId') studyId: string,
    @Param('userId') userId: string,
  ): Promise<Study | { message: string }> {
    return this.studyService.addParticipants(studyId, userId);
  }

  @Delete(':studyId/remove-participant/:userId')
  @UseGuards(AdminTokenGuard)
  @ApiOperation({
    summary: `스터디 참여자 취소하기  ${TAG.ADMIN_REQUIRED}`,
    description: '관리자가 스터디 참여자를 지원자로 변경합니다(applicant).',
  })
  @ApiOkResponse({ type: Study })
  removeParticipants(
    @Param('studyId') studyId: string,
    @Param('userId') userId: string,
  ): Promise<Study> {
    return this.studyService.removeParticipant(studyId, userId);
  }
}

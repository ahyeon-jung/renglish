import { Body, Controller, Get, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { TAG } from 'src/common/constants/tag';
import { StudyDto } from 'src/study/dto/get-study.dto';
// biome-ignore lint/style/useImportType: Required as runtime import for NestJS dependency injection
import { StudyService } from 'src/study/study.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';
// biome-ignore lint/style/useImportType: Required as runtime import for NestJS dependency injection
import { UserService } from 'src/user/user.service';
import { WritingDto } from 'src/writing/dto/writing.dto';
// biome-ignore lint/style/useImportType: Required as runtime import for NestJS dependency injection
import { WritingService } from 'src/writing/writing.service';

@UseGuards(AccessTokenGuard)
@Controller('my')
export class MyController {
  constructor(
    private readonly userService: UserService,
    private readonly studyService: StudyService,
    private readonly writingService: WritingService,
  ) { }
  @Get('')
  @ApiOperation({
    summary: `현재 사용자 정보 ${TAG.TOKEN_REQUIRED}`,
    description: '현재 사용자 정보를 가져옵니다.',
  })
  @ApiOkResponse({ type: User })
  findUserByToken(@Request() req) {
    return req.user;
  }

  @Put('')
  @ApiOperation({
    summary: `사용자 정보 변경 ${TAG.TOKEN_REQUIRED}`,
    description: '사용자가 정보 변경을 시도합니다.',
  })
  @ApiBody({ type: UpdateUserDto })
  changeUser(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  @Get('/studies')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: `사용자가 참여중인 스터디 목록 ${TAG.TOKEN_REQUIRED}`,
    description: '참여중인 스터디를 조회합니다.',
  })
  @ApiQuery({
    name: 'type',
    description: '참여한 스터디(participant) 혹은 지원한 스터디(applicant)',
    example: 'participant',
    type: String,
    required: false,
  })
  @ApiOkResponse({ type: StudyDto, isArray: true })
  findMyStudies(@Request() req, @Query('type') type?: string) {
    const userId = req.user.id;
    return this.studyService.findByUser(userId, type);
  }

  @Get('/writings')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: `사용자가 작성한 작문 목록 ${TAG.TOKEN_REQUIRED}`,
    description: '사용자가 작성한 작문을 조회합니다.',
  })
  @ApiOkResponse({ type: WritingDto, isArray: true })
  findMyWritings(@Request() req) {
    const userId = req.userid;
    return this.writingService.findByUser(userId);
  }
}

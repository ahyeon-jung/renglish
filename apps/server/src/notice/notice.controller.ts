import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Notice } from './entities/notice.entity';
import { AdminTokenGuard } from 'src/auth/guards/admin-token.guard';
import { TAG } from 'src/common/constants/tag';
import { DeleteResult } from 'typeorm';

@ApiTags('Notices')
@Controller('notices')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  @UseGuards(AdminTokenGuard)
  @ApiOperation({
    summary: `공지사항 작성 ${TAG.ADMIN_REQUIRED}`,
    description: '공지사항을 추가합니다.',
  })
  @ApiBody({ type: CreateNoticeDto })
  create(@Body() createNoticeDto: CreateNoticeDto): Promise<Notice> {
    return this.noticeService.create(createNoticeDto);
  }

  @Get()
  @ApiOperation({
    summary: '모든 공지사항 가져오기',
    description: '모든 공지사항을 가져옵니다.',
  })
  async findAll(): Promise<Notice[]> {
    return this.noticeService.findAll();
  }

  @Get(':noticeId')
  @ApiOperation({
    summary: '해당 ID 공지사항 가져오기',
    description: '해당 ID의 공지사항을 가져옵니다.',
  })
  findOne(@Param('noticeId') noticeId: string): Promise<Notice> {
    return this.noticeService.findOne(noticeId);
  }

  @Patch(':noticeId')
  @UseGuards(AdminTokenGuard)
  @ApiOperation({
    summary: `공지사항 수정 ${TAG.ADMIN_REQUIRED}`,
    description: '해당 ID의 공지사항을 업데이트합니다.',
  })
  update(
    @Param('noticeId') noticeId: string,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ): Promise<Notice> {
    return this.noticeService.update(noticeId, updateNoticeDto);
  }

  @Delete(':noticeId')
  @UseGuards(AdminTokenGuard)
  @ApiOperation({
    summary: `해당 ID 공지사항 삭제 ${TAG.ADMIN_REQUIRED}`,
    description: '해당 ID의 공지사항을 삭제합니다.',
  })
  remove(@Param('noticeId') noticeId: string): Promise<DeleteResult> {
    return this.noticeService.remove(noticeId);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Notice } from './entities/notice.entity';

@ApiTags('Notices')
@Controller('notices')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  @ApiOperation({
    summary: '공지사항 작성',
    description: '공지사항을 추가합니다.',
  })
  @ApiBody({ type: CreateNoticeDto })
  create(@Body() createNoticeDto: CreateNoticeDto) {
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
  findOne(@Param('noticeId') noticeId: string) {
    return this.noticeService.findOne(noticeId);
  }

  @Patch(':noticeId')
  @ApiOperation({
    summary: '해당 ID 공지사항 업데이트',
    description: '해당 ID의 공지사항을 업데이트합니다.',
  })
  update(
    @Param('noticeId') noticeId: string,
    @Body() updateNoticeDto: UpdateNoticeDto
  ) {
    return this.noticeService.update(noticeId, updateNoticeDto);
  }

  @Delete(':noticeId')
  @ApiOperation({
    summary: '해당 ID 공지사항 삭제',
    description: '해당 ID의 공지사항을 삭제합니다.',
  })
  remove(@Param('noticeId') noticeId: string) {
    return this.noticeService.remove(noticeId);
  }
}

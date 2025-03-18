import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { WritingService } from './writing.service';
import { CreateWritingDto } from './dto/create-writing.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Writing } from './entities/writing.entity';

@ApiTags('Writings')
@Controller('writings')
export class WritingController {
  constructor(private readonly writingService: WritingService) {}

  @Post(':dialogueId')
  @ApiOperation({
    summary: '사용자가 작성한 대사의 대본 저장하기',
    description: '사용자가 작성한 대사의 대본을 저장합니다.',
  })
  @ApiParam({
    name: 'dialogueId',
    description: '대사의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  create(
    @Param('dialogueId') dialogueId: string,
    @Body() createWritingDto: CreateWritingDto
  ) {
    return this.writingService.create(dialogueId, createWritingDto);
  }

  @Get(':movieId')
  @ApiOperation({
    summary: '사용자가 작성한 작문 정보 가져오기',
    description: '사용자가 작성한 작문 정보를 가져옵니다.',
  })
  @ApiParam({
    name: 'movieId',
    description: '사용자의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  async findAllByMovieId(
    @Param('movieId') movieId: string
  ): Promise<Writing[]> {
    return this.writingService.findAllByMovieId(movieId);
  }
}

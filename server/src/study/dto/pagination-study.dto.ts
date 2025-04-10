import { ApiProperty } from '@nestjs/swagger';
import { ExtendedFilteredStudyDto } from './extended-study.dto';

export class PaginationStudyResponseDto {
  @ApiProperty({ description: '전체 항목 수' })
  totalCount: number;

  @ApiProperty({ description: '현재 페이지 번호' })
  currentPage: number;

  @ApiProperty({ description: '페이지당 항목 수' })
  limit: number;

  @ApiProperty({ type: [ExtendedFilteredStudyDto], description: '응답 데이터 배열' })
  data: ExtendedFilteredStudyDto[];
}
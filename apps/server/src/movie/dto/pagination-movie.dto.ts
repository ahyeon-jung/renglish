import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '../entities/movie.entity';

export class PaginationMovieResponseDto {
  @ApiProperty({ description: '전체 항목 수' })
  totalCount: number;

  @ApiProperty({ description: '현재 페이지 번호' })
  currentPage: number;

  @ApiProperty({ description: '페이지당 항목 수' })
  limit: number;

  @ApiProperty({ type: () => [Movie], description: '응답 데이터 배열' })
  data: Movie[];
}

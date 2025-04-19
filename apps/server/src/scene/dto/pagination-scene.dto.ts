import { ApiProperty, PickType } from '@nestjs/swagger';
import { Scene } from '../entities/scene.entity';

class PaginationSceneDto extends PickType(Scene, [
  'id',
  'title',
  'description',
  'audioUrl',
  'speakers',
  'createdAt',
  'updatedAt',
]) {}

export class PaginationSceneResponseDto {
  @ApiProperty({ description: '전체 항목 수' })
  totalCount: number;

  @ApiProperty({ description: '현재 페이지 번호' })
  currentPage: number;

  @ApiProperty({ type: [PaginationSceneDto], description: '응답 데이터 배열' })
  data: PaginationSceneDto[];
}

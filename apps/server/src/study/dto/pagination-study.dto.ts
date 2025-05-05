import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { Study } from "../entities/study.entity";
import { Scene } from "src/scene/entities/scene.entity";

class ListStudySceneDto extends OmitType(Scene, ["dialogues", "expressions"]) {}

export class ListStudyDto extends PickType(Study, [
  "id",
  "title",
  "description",
  "studiedAt",
  "createdAt",
  "updatedAt",
  "applicants",
  "participants",
  "isCompleted",
]) {
  @ApiProperty({ type: ListStudySceneDto })
  scene: ListStudySceneDto;

  @ApiProperty({ description: "스터디 진행 상황" })
  isCompleted: boolean;
}

export class PaginationStudyResponseDto {
  @ApiProperty({ description: "전체 항목 수" })
  totalCount: number;

  @ApiProperty({ description: "현재 페이지 번호" })
  currentPage: number;

  @ApiProperty({ description: "페이지당 항목 수" })
  limit: number;

  @ApiProperty({ type: () => [ListStudyDto], description: "응답 데이터 배열" })
  data: ListStudyDto[];
}

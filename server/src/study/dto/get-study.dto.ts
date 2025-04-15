import { ApiProperty } from '@nestjs/swagger';
import { OmitType, PickType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { SearchParams } from 'src/common/dto/search-params.dto';
import { Scene } from 'src/scene/entities/scene.entity';
import { Study } from '../entities/study.entity';

export class GetStudyParams extends SearchParams {
  @IsOptional()
  @IsString()
  status?: string;
}

class StudySceneDto extends OmitType(Scene, ['dialogues', 'expressions', 'speakers']) { }

export class StudyDto extends PickType(Study, ['id', 'title', 'description', 'studiedAt', 'createdAt', 'updatedAt', 'applicants', 'participants', 'isCompleted']) {
  @ApiProperty({ type: StudySceneDto })
  scene: StudySceneDto;

  @ApiProperty({ description: '참여자 수' })
  participantCount: number;

  @ApiProperty({ description: '지원자 수' })
  applicantCount: number;
}
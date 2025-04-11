import { ApiProperty } from '@nestjs/swagger';
import { Study } from '../entities/study.entity';

export class ExtendedFilteredStudyDto extends Study {
  @ApiProperty({ description: '스터디 참여자 수' })
  participantCount: number;

  @ApiProperty({ description: '스터디 신청자 수' })
  applicantCount: number;

  @ApiProperty({ description: '스터디 진행 상황' })
  isCompleted: boolean;
}

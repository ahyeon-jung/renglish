import { Study } from '../entities/study.entity';

export class ExtendedFilteredStudyDto extends Study {
  participantCount: number;
  applicantCount: number;
  isCompleted: boolean;
}

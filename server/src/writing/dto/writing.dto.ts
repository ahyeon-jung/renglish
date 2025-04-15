import { ApiProperty, PickType } from '@nestjs/swagger';
import { Writing } from '../entities/writing.entity';
import { Dialogue } from 'src/dialogue/entities/dialogue.entity';

export class WritingDto extends PickType(Writing, ['id', 'writing', 'createdAt', 'updatedAt', 'dialogue']) {
  @ApiProperty({ type: Dialogue })
  dialogue: Dialogue;
}

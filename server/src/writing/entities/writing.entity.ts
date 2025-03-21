import { Column, Entity, ManyToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Dialogue } from 'src/dialogue/entities/dialogue.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Writing extends BaseEntity {
  @Column()
  @ApiProperty({
    type: String,
    example: "Oh, if you're laughing at me, I swear to God I'll push you out of that chair.",
  })
  writing: string;

  @ManyToOne(() => User, (user) => user.writings)
  user: User;

  @ManyToOne(() => Dialogue, (dialogue) => dialogue.writings)
  dialogue: Dialogue;
}

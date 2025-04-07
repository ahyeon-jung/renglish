import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Expression } from 'src/expression/entities/expression.entity';
import { Scene } from 'src/scene/entities/scene.entity';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { Writing } from 'src/writing/entities/writing.entity';

@Entity()
export class Dialogue extends BaseEntity {
  @Column()
  @ApiProperty({
    type: String,
    example: "Oh, if you're laughing at me, I swear to God I'll push you out of that chair.",
  })
  english_script: string;

  @Column()
  @ApiProperty({
    type: String,
    example: '오, 만약 저를 웃고 있다면, 진짜로 그 의자에서 밀어낼 거예요.',
  })
  korean_script: string;

  @Column({ default: 0 })
  @ApiProperty({
    type: Number,
    example: 1,
  })
  order: number;

  @ManyToOne(() => Scene, (scene) => scene.dialogues, { onDelete: 'CASCADE' })
  scene: Scene;

  @ManyToOne(() => Speaker, (speaker) => speaker.dialogues, { onDelete: 'CASCADE' })
  speaker: Speaker;

  @OneToMany(() => Writing, (writing) => writing.dialogue)
  writings: Writing;

  @OneToOne(() => Expression, (expression) => expression.dialogue)
  expression: Expression;
}

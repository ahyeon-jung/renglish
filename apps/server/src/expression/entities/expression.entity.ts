import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Dialogue } from 'src/dialogue/entities/dialogue.entity';
import { Scene } from 'src/scene/entities/scene.entity';

export class ExampleDto {
  @ApiProperty({ example: 'She killed it tonight.' })
  en: string;

  @ApiProperty({ example: '그녀 오늘 밤 대박쳤어.' })
  ko: string;
}

@Entity()
export class Expression extends BaseEntity {
  @Column()
  @ApiProperty({
    type: String,
    example: 'She killed it (tonight)',
  })
  expression: string;

  @Column()
  @ApiProperty({
    type: String,
    example: '완전 잘했어, 성공했어.',
  })
  meaning: string;

  @Column()
  @ApiProperty({
    type: String,
    example: '어떤 일을 매우 잘했을 때 쓰는 표현',
  })
  usage: string;

  @Column('simple-json')
  @ApiProperty({
    type: [ExampleDto],
    example: [
      { en: 'She killed it tonight.', ko: '그녀 오늘 밤 대박쳤어.' },
      { en: 'You killed it on stage!', ko: '무대에서 완전 잘했어!' },
    ],
    description: '영어 예문과 한글 번역 배열 (최대 2개)',
  })
  examples: { en: string; ko: string }[];

  @ManyToOne(() => Scene, (scene) => scene.expressions)
  scene: Scene;

  @OneToOne(() => Dialogue, (dialogue) => dialogue.expression)
  dialogue: Dialogue;
}

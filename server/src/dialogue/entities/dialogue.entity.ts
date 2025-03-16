import { Column, Entity, ManyToOne } from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/entities/base.entity";
import { Scene } from "src/scene/entities/scene.entity";

@Entity()
export class Dialogue extends BaseEntity {
  @Column()
  @ApiProperty({
    type: String,
    example:
      "Oh, if you're laughing at me, I swear to God I'll push you out of that chair.",
  })
  english_script: string;

  @Column()
  @ApiProperty({
    type: String,
    example: "오, 만약 저를 웃고 있다면, 진짜로 그 의자에서 밀어낼 거예요.",
  })
  korean_script: string;

  @ManyToOne(() => Scene, (scene) => scene.dialogues)
  scene: Scene;
}

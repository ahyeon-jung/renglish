import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/entities/base.entity";
import { Dialogue } from "src/dialogue/entities/dialogue.entity";
import { Scene } from "src/scene/entities/scene.entity";

@Entity()
export class Speaker extends BaseEntity {
  @Column()
  @ApiProperty({
    type: String,
    example: "Louisa Clark",
  })
  speaker_name: string;

  @Column()
  @ApiProperty({
    type: String,
    example: "A",
  })
  speaker_type: string;

  @ManyToOne(() => Scene, (scene) => scene.speakers)
  scene: Scene;

  @OneToMany(() => Dialogue, (dialogue) => dialogue.scene)
  dialogues: Dialogue;
}

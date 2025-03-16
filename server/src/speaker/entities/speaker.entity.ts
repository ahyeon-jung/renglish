import { Column, Entity, ManyToOne } from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/entities/base.entity";
import { Scene } from "src/scene/entities/scene.entity";

@Entity()
export class Speaker extends BaseEntity {
  @Column()
  @ApiProperty({
    type: String,
    example: "Louisa Clark",
  })
  speaker_name: string;

  @ManyToOne(() => Scene, (scene) => scene.speakers)
  scene: Scene;
}

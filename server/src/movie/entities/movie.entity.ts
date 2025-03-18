import { Column, Entity, OneToMany } from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/entities/base.entity";
import { Scene } from "src/scene/entities/scene.entity";

@Entity()
export class Movie extends BaseEntity {
  @ApiProperty({
    type: String,
    example: "Me Before You",
  })
  @Column()
  title: string;

  @Column()
  imageUrl: string;

  @Column()
  studiedAt: Date;

  @ApiProperty({
    type: String,
    example:
      "A romantic drama about a young woman who becomes a caregiver for a paralyzed man, and their unexpected love story.",
  })
  @Column()
  description: string;

  @ApiProperty({
    type: [Scene],
    isArray: true,
  })
  @OneToMany(() => Scene, (scene) => scene.movie)
  scenes: Scene[];
}

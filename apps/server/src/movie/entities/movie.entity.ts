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

  @ApiProperty({
    type: String,
    example: "romance",
  })
  @Column()
  category: string;

  @ApiProperty({
    type: String,
    example:
      "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20160520_45%2F14637112153058xJx0_JPEG%2Fmovie_image.jpg",
  })
  @Column()
  imageUrl: string;

  @ApiProperty({
    type: String,
    example:
      "A romantic drama about a young woman who becomes a caregiver for a paralyzed man, and their unexpected love story.",
  })
  @Column()
  description: string;

  @ApiProperty({
    type: () => [Scene],
    isArray: true,
  })
  @OneToMany(
    () => Scene,
    (scene) => scene.movie,
  )
  scenes: Scene[];
}

import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/entities/base.entity";
import { Dialogue } from "src/dialogue/entities/dialogue.entity";
import { Exclude, Transform } from "class-transformer";
import { Expression } from "src/expression/entities/expression.entity";
import { Movie } from "src/movie/entities/movie.entity";
import { Speaker } from "src/speaker/entities/speaker.entity";
import { Study } from "src/study/entities/study.entity";

@Entity()
export class Scene extends BaseEntity {
  @Column()
  @ApiProperty({
    type: String,
    example: "Romantic conversation",
  })
  title: string;

  @Column()
  @ApiProperty({
    type: String,
    example: "They have a romantic conversation",
  })
  description: string;

  @ApiProperty()
  @Column()
  audioUrl: string;

  @ManyToOne(
    () => Movie,
    (movie) => movie.scenes,
  )
  @ApiProperty({ type: () => Movie })
  movie: Movie;

  @ManyToOne(
    () => Study,
    (study) => study.scene,
  )
  @ApiProperty({ type: () => Study })
  study: Study;

  @OneToMany(
    () => Speaker,
    (speaker) => speaker.scene,
    { onDelete: "CASCADE" },
  )
  @ApiProperty({ type: () => [Speaker] })
  speakers: Speaker[];

  @OneToMany(
    () => Dialogue,
    (dialogue) => dialogue.scene,
    { onDelete: "CASCADE" },
  )
  @ApiProperty({ type: () => [Dialogue] })
  dialogues: Dialogue[];

  @Transform(({ value }) => value ?? [], { toPlainOnly: true })
  @OneToMany(
    () => Expression,
    (expression) => expression.scene,
  )
  @ApiProperty({ type: () => [Expression] })
  expressions: Expression[];
}

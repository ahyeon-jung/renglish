import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { BaseEntity } from "src/common/entities/base.entity";
import { Dialogue } from "src/dialogue/entities/dialogue.entity";
import { Movie } from "src/movie/entities/movie.entity";
import { Speaker } from "src/speaker/entities/speaker.entity";

@Entity()
export class Scene extends BaseEntity {
  @ManyToOne(() => Movie, (movie) => movie.scenes)
  movie: Movie;

  @OneToMany(() => Speaker, (speaker) => speaker.scene)
  speakers: Speaker;

  @OneToMany(() => Dialogue, (dialogue) => dialogue.scene)
  dialogues: Dialogue;
}

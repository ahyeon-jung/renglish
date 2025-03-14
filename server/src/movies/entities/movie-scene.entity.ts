import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Movie } from './movie.entity';
import { MovieSceneDialogue } from './movie-scene-dialogue.entity';

@Entity()
export class MovieScene {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie, (movie) => movie.scenes)
  @JoinColumn()
  movie: Movie;

  @OneToMany(() => MovieSceneDialogue, (dialogue) => dialogue.scene)
  dialogues: MovieSceneDialogue[];

  @Column('simple-array')
  speakers: string[];
}

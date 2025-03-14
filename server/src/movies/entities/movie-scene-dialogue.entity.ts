import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MovieScene } from './movie-scene.entity';

@Entity()
export class MovieSceneDialogue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MovieScene, (scene) => scene.dialogues)
  @JoinColumn()
  scene: MovieScene;

  @Column()
  speaker: string;

  @Column()
  en: string;

  @Column()
  ko: string;
}

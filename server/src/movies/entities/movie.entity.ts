import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { MovieScene } from './movie-scene.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => MovieScene, (scene) => scene.movie)
  scenes: MovieScene[];
}

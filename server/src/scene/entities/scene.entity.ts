import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Dialogue } from 'src/dialogue/entities/dialogue.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { Speaker } from 'src/speaker/entities/speaker.entity';

@Entity()
export class Scene extends BaseEntity {
  @Column()
  @ApiProperty({
    type: String,
    example: 'Romantic conversation',
  })
  title: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    type: Date,
    example: '2025-03-16 10:00:00',
  })
  studiedAt: Date;
  @Column()
  @ApiProperty({
    type: String,
    example: 'They have a romantic conversation',
  })
  description: string;

  @ManyToOne(() => Movie, (movie) => movie.scenes)
  movie: Movie;

  @OneToMany(() => Speaker, (speaker) => speaker.scene, { onDelete: 'CASCADE' })
  speakers: Speaker[];

  @OneToMany(() => Dialogue, (dialogue) => dialogue.scene, { onDelete: 'CASCADE' })
  dialogues: Dialogue[];
}

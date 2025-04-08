import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Scene } from 'src/scene/entities/scene.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Study extends BaseEntity {
  @Column()
  studiedAt: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Scene, (scene) => scene.study)
  @ApiProperty({ type: Scene })
  scene: Scene;

  @ManyToMany(() => User, (user) => user.appliedStudies)
  @JoinTable({ name: 'study_applicants' })
  @ApiProperty({ type: () => [User], description: '스터디 신청자' })
  applicants: User[];

  @ManyToMany(() => User, (user) => user.participatedStudies)
  @JoinTable({ name: 'study_participants' })
  @ApiProperty({ type: () => [User], description: '스터디 참여자' })
  participants: User[];
}

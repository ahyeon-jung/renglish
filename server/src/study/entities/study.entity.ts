import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Scene } from 'src/scene/entities/scene.entity';
import { User } from 'src/user/entities/user.entity';
import { Transform } from 'class-transformer';

@Entity()
export class Study extends BaseEntity {
  @ApiProperty({ description: '스터디 진행 일자' })
  @Column()
  studiedAt: Date;

  @ApiProperty({ description: '스터디 제목' })
  @Column()
  title: string;

  @ApiProperty({ description: '스터디 설명' })
  @Column()
  description: string;

  @ApiProperty({ description: '스터디 완료 여부' })
  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => Scene, (scene) => scene.study)
  @ApiProperty({ type: Scene })
  @JoinColumn()
  scene: Scene;

  @Transform(({ value }) => value ?? [], { toPlainOnly: true })
  @ManyToMany(() => User, (user) => user.appliedStudies)
  @JoinTable({ name: 'study_applicants' })
  @ApiPropertyOptional({ type: () => [User], description: '스터디 신청자' })
  applicants?: User[];

  @Transform(({ value }) => value ?? [], { toPlainOnly: true })
  @ManyToMany(() => User, (user) => user.participatedStudies)
  @JoinTable({ name: 'study_participants' })
  @ApiPropertyOptional({ type: () => [User], description: '스터디 참여자' })
  participants?: User[];
}

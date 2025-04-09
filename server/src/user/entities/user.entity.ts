import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/common/entities/base.entity';
import { Inquiry } from 'src/inquiry/entities/inquiry.entity';
import { Study } from 'src/study/entities/study.entity';
import { Writing } from 'src/writing/entities/writing.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  hashedRefreshToken?: string;

  @OneToMany(() => Writing, (writing) => writing.dialogue)
  writings: Writing;

  @OneToMany(() => Inquiry, (inquiry) => inquiry.user)
  inquiries: Inquiry[];

  @ManyToMany(() => Study, (study) => study.applicants)
  appliedStudies: Study[];

  @ManyToMany(() => Study, (study) => study.participants)
  participatedStudies: Study[];
}

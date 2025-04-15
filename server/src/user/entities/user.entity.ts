import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/common/entities/base.entity';
import { Inquiry } from 'src/inquiry/entities/inquiry.entity';
import { Study } from 'src/study/entities/study.entity';
import { Writing } from 'src/writing/entities/writing.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({
    description: '소셜 계정 플랫폼',
    example: 'google',
  })
  @Column()
  provider: string;

  @ApiProperty({
    description: '이메일',
    example: 'test@test.com',
  })
  @Column()
  email: string;

  @Column()
  password: string;

  @ApiProperty({
    description: '닉네임',
    example: 'test',
  })
  @Column()
  nickname: string;

  @Column({ nullable: true })
  how?: string;

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

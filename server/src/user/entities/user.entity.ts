import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/common/entities/base.entity';
import { Inquiry } from 'src/inquiry/entities/inquiry.entity';
import { Writing } from 'src/writing/entities/writing.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Writing, (writing) => writing.dialogue)
  writings: Writing;

  @OneToMany(() => Inquiry, (inquiry) => inquiry.user)
  inquiries: Inquiry;
}

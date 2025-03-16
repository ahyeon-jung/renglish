import { Column, Entity } from "typeorm";

import { BaseEntity } from "src/common/entities/base.entity";

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;
}

import { Column, Entity } from "typeorm";

import { BaseEntity } from "src/common/entities/base.entity";

@Entity()
export class Writing extends BaseEntity {
  @Column()
  user_script: string;
}

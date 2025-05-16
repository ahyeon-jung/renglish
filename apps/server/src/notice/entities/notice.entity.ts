import { Column, Entity } from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/entities/base.entity";

@Entity()
export class Notice extends BaseEntity {
  @ApiProperty({
    type: String,
    example: "How to install",
  })
  @Column()
  title: string;

  @ApiProperty({
    type: String,
    example: "1. Click the add Button.",
  })
  @Column()
  content: string;
}

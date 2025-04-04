import { Column, Entity } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Statistic extends BaseEntity {
  @Column()
  public id: string;

  @Column()
  @ApiProperty({
    type: String,
    example: 'visitor',
  })
  type: string;

  @Column()
  @ApiProperty({
    type: Number,
    example: 500,
  })
  count: number;
}

import { Column, Entity, ManyToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Inquiry extends BaseEntity {
  @ApiProperty({
    type: String,
    example: 'Want to Other movies',
  })
  @Column()
  title: string;

  @ApiProperty({
    type: String,
    example: 'I want to study with Korean drama.',
  })
  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.inquiries)
  user: User;
}

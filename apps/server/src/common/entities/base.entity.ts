import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ description: '생성일' })
  @CreateDateColumn()
  public createdAt: Date;

  @ApiProperty({ description: '수정일' })
  @UpdateDateColumn()
  public updatedAt: Date;

  @ApiProperty({ description: '삭제일' })
  @DeleteDateColumn()
  public deletedAt: Date;
}

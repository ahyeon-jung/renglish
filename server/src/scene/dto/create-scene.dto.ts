import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateSceneDto {
  @ApiProperty({
    type: String,
    example: 'Scene Title',
    description: 'Scene의 제목',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '2025-03-16 10:00:00',
    description: '스터디 진행 날짜',
    required: true,
  })
  @IsNotEmpty({ message: 'StudiedAt is required' })
  @IsDateString({ strict: true }, { message: 'studiedAt must be a valid ISO date string' })
  studiedAt: Date;

  @ApiProperty({
    type: String,
    example: '장면에 대한 설명',
    description: 'Scene의 설명',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    example: 'Me Before You',
    description: '영화 제목',
    required: true,
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty({
    example:
      'https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20160520_45%2F14637112153058xJx0_JPEG%2Fmovie_image.jpg',
    description: '영화 이미지 주소',
    required: true,
  })
  @IsNotEmpty({ message: 'ImageUrl is required' })
  @IsString({ message: 'ImageUrl must be a string' })
  imageUrl: string;

  @ApiProperty({
    example: '2025-03-16 10:00:00',
    description: '스터디 진행 날짜',
    required: true,
  })
  @IsNotEmpty({ message: 'StudiedAt is required' })
  @IsString({ message: 'StudiedAt must be a Date' })
  studiedAt: Date;

  @ApiProperty({
    example: 'A romantic drama about a young woman who becomes a caregiver for a paralyzed man',
    description: '영화 설명',
    required: true,
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;
}

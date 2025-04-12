import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'kakao',
    description: '소셜 로그인 플랫폼',
    required: true,
  })
  provider: string;

  @ApiProperty({
    example: 'user@example.com',
    description: '사용자의 이메일 주소',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  email: string;

  @ApiProperty({
    example: '아현정',
    description: '사용자의 닉네임',
    required: true,
  })
  @IsNotEmpty({ message: 'Nickname is required' })
  @IsString({ message: 'Nickname must be a string' })
  nickname: string;

  @ApiProperty({
    example: '지인 소개',
    description: '알게된 경로',
    required: true,
  })
  @IsString({ message: 'How must be a string' })
  how?: string;

  @ApiProperty({
    example: 'securePassword123',
    description: '사용자의 비밀번호',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}

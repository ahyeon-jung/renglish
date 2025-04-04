import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '사용자의 이메일 주소',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  email: string;

  @ApiProperty({
    example: 'securePassword123',
    description: '사용자의 새로운 비밀번호',
    required: true,
  })
  @IsNotEmpty({ message: 'NewPassword is required' })
  @IsString({ message: 'NewPassword must be a string' })
  newPassword: string;
}

import { IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: "user@example.com",
    description: "사용자의 이메일 주소",
    required: true,
  })
  @IsNotEmpty({ message: "Email is required" })
  @IsString({ message: "Email must be a string" })
  email: string;

  @ApiProperty({
    example: "securePassword123",
    description: "사용자의 비밀번호",
    required: true,
  })
  @IsNotEmpty({ message: "Password is required" })
  @IsString({ message: "Password must be a string" })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    example: "accessToken",
    description: "사용자의 액세스 토큰",
    required: true,
  })
  @IsNotEmpty({ message: "accessToken is required" })
  @IsString({ message: "accessToken must be a string" })
  accessToken: string;

  @ApiProperty({
    example: "refreshToken",
    description: "사용자의 리프레시 토큰",
    required: true,
  })
  @IsNotEmpty({ message: "refreshToken is required" })
  @IsString({ message: "refreshToken must be a string" })
  refreshToken: string;
}

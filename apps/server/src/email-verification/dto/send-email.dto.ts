import { IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class SendEmailDto {
  @ApiProperty({
    example: "user@example.com",
    description: "인증 요청을 보낼 사용자의 이메일 주소",
    required: true,
  })
  @IsNotEmpty({ message: "Email is required" })
  @IsString({ message: "Email must be a string" })
  email: string;
}

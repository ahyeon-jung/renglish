import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateStudyDto {
  @ApiProperty({
    type: String,
    example: "엘리멘탈과 함께 영어 표현 공부",
    description: "스터디명",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: "2025-03-16 10:00:00",
    description: "스터디 진행 날짜",
    required: true,
  })
  @IsNotEmpty({ message: "StudiedAt is required" })
  @IsString({ message: "StudiedAt must be a Date" })
  studiedAt: Date;

  @ApiProperty({
    type: String,
    example: "엘리멘탈로 영어 표현 공부해요",
    description: "스터디 설명",
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value ?? false)
  isCompleted?: boolean;
}

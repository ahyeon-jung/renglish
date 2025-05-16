import { IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateSceneDto {
  @ApiProperty({
    type: String,
    example: "Scene Title",
    description: "Scene의 제목",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: "https://example.com/audio.mp3",
    description: "장면의 오디오 URL",
    required: true,
  })
  @IsNotEmpty({ message: "AudioUrl is required" })
  @IsString()
  audioUrl: string;

  @ApiProperty({
    type: String,
    example: "장면에 대한 설명",
    description: "Scene의 설명",
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

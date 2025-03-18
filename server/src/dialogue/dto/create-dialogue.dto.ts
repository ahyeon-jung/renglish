import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateDialogueDto {
  @ApiProperty({
    type: String,
    example:
      "Oh, if you're laughing at me, I swear to God I'll push you out of that chair.",
    description: '영어 대사',
  })
  @IsString()
  @IsNotEmpty()
  english_script: string;

  @ApiProperty({
    type: String,
    example: '오, 만약 저를 웃고 있다면, 진짜로 그 의자에서 밀어낼 거예요.',
    description: '한국어 대사',
  })
  @IsString()
  @IsNotEmpty()
  korean_script: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @ApiProperty({
    type: String,
    example: '1',
    description: '이 대사가 속한 Scene ID',
  })
  @IsNotEmpty()
  sceneId: string;

  @ApiProperty({
    type: String,
    example: '1',
    description: '이 대사를 말하는 Speaker ID',
  })
  @IsNotEmpty()
  speakerId: string;
}

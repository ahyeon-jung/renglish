import { IsArray, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CreateDialogueDto } from 'src/dialogue/dto/create-dialogue.dto';
import { CreateSpeakerDto } from 'src/speaker/dto/create-speaker.dto';

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
    type: String,
    example: '장면에 대한 설명',
    description: 'Scene의 설명',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: [CreateSpeakerDto],
    description: '장면에 포함될 Speaker들',
  })
  @IsArray()
  speakers: CreateSpeakerDto[];

  @ApiProperty({
    type: [CreateDialogueDto],
    description: '장면에 포함될 Dialogue들',
  })
  @IsArray()
  dialogues: CreateDialogueDto[];
}

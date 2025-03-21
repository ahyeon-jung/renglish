import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateSpeakerDto {
  @ApiProperty({
    type: String,
    example: 'Louisa Clark',
    description: 'The name of the speaker',
  })
  @IsNotEmpty()
  @IsString()
  speaker_name: string;

  @ApiProperty({
    type: String,
    example: 'A',
    description: 'The type of the speaker (e.g., A, B, etc.)',
  })
  @IsNotEmpty()
  @IsString()
  speaker_type: string;

  @ApiProperty({
    type: String,
    example: '1',
    description: 'The ID of the scene this speaker belongs to',
  })
  @IsNotEmpty()
  @IsString()
  sceneId: string;
}

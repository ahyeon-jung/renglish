import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateWritingDto {
  @ApiProperty({
    type: String,
    example: "Oh, if you're laughing at me, I swear to God I'll push you out of that chair.",
  })
  @IsString()
  @IsNotEmpty()
  writing: string;
}

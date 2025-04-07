import { ArrayMaxSize, IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ExampleDto {
  @ApiProperty({ example: 'She killed it tonight.' })
  @IsString()
  en: string;

  @ApiProperty({ example: '그녀 오늘 밤 대박쳤어.' })
  @IsString()
  ko: string;
}

export class CreateExpressionDto {
  @ApiProperty({
    example: 'She killed it (tonight)',
  })
  @IsString()
  @IsNotEmpty()
  expression: string;

  @ApiProperty({
    example: '완전 잘했어, 성공했어.',
  })
  @IsString()
  @IsNotEmpty()
  meaning: string;

  @ApiProperty({
    example: '어떤 일을 매우 잘했을 때 쓰는 표현',
  })
  @IsString()
  @IsNotEmpty()
  usage: string;

  @ApiProperty({
    type: [ExampleDto],
    example: [
      { en: 'She killed it tonight.', ko: '그녀 오늘 밤 대박쳤어.' },
      { en: 'You killed it on stage!', ko: '무대에서 완전 잘했어!' },
    ],
    description: '영어 예문과 한글 번역 배열 (최대 2개)',
  })
  @IsArray()
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  @Type(() => ExampleDto)
  examples: ExampleDto[];
}

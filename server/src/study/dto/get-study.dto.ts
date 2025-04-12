import { IsOptional, IsString } from 'class-validator';

import { SearchParams } from 'src/common/dto/search-params.dto';

export class GetStudyParams extends SearchParams {
  @IsOptional()
  @IsString()
  status?: string;
}

import { IsOptional, IsString } from "class-validator";

import { SearchParams } from "src/common/dto/search-params.dto";

export class SearchMovieParams extends SearchParams {
  @IsOptional()
  @IsString()
  category?: string;
}

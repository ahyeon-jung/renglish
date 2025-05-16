import { IsOptional, IsString } from "class-validator";

import { PaginationParams } from "./pagination-params.dto";

export class SearchParams extends PaginationParams {
  @IsOptional()
  @IsString()
  keyword?: string;
}

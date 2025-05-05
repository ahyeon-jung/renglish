import { IsInt, Min } from "class-validator";

export class PaginationParams {
  @IsInt()
  @Min(1)
  offset: number = 1;

  @IsInt()
  @Min(1)
  limit: number = 10;
}

import { FindManyOptions, Repository } from "typeorm";

import { PaginationParams } from "../dto/pagination-params.dto";

export interface PaginationResponse<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export async function findAllWithPagination<T>(
  repository: Repository<T>,
  where: object = {},
  relations: string[] = [],
  { offset, limit }: PaginationParams,
  order: FindManyOptions<T>["order"] = {},
): Promise<PaginationResponse<T>> {
  const skip = (offset - 1) * limit;
  const take = limit;

  const [data, totalCount] = await repository.findAndCount({
    where,
    relations,
    skip,
    take,
    order,
  });

  const totalPages = Math.ceil(totalCount / limit);

  return {
    data,
    totalCount,
    currentPage: +offset,
    totalPages,
  };
}

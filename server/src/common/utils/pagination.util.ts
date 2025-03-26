import { Repository } from 'typeorm';

export interface PaginationParams {
  offset: number;
  limit: number;
}

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
): Promise<PaginationResponse<T>> {
  const skip = (offset - 1) * limit;
  const take = limit;

  const [data, totalCount] = await repository.findAndCount({
    where,
    relations,
    skip,
    take,
  });

  const totalPages = Math.ceil(totalCount / limit);

  return {
    data,
    totalCount,
    currentPage: +offset,
    totalPages,
  };
}

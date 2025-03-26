export type APIResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export type SearchParams = { keyword?: string };

export type PaginationParams = {
  offset?: number;
  limit?: number;
};

export type PaginationResponse<T> = {
  data: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
};

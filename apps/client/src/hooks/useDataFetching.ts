import { useQuery } from "@tanstack/react-query";

interface UseDataFetchingOptions<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  enabled?: boolean;
}

export function useDataFetching<T>({
  queryKey,
  queryFn,
  enabled = true,
}: UseDataFetchingOptions<T>) {
  return useQuery({
    queryKey,
    queryFn,
    enabled,
  });
}

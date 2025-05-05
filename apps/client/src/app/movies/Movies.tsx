"use client";

import { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";

import Categories from "./_components/Categories";
import ScriptListItem from "./_components/ScriptListItem";
import clsx from "clsx";
import { Movie } from "@/types/movie";
import getMovies from "../actions/movies/getMovies";
import { PaginationResponse } from "@/types/api";
import { ActionResponse } from "@/types/action";

const PAGE_SIZE = 5;

export default function MoviesPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const parentRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<
    ActionResponse<PaginationResponse<Movie>>
  >({
    initialPageParam: 1,
    queryKey: ["movies", category],
    queryFn: ({ pageParam }) =>
      getMovies({
        keyword: undefined,
        category: category ?? undefined,
        offset: (pageParam as number) ?? 1,
        limit: PAGE_SIZE,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      const totalPages = Math.ceil(lastPage.data.totalCount / PAGE_SIZE);
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });

  const movies = data?.pages.flatMap((page) => page.data.data) ?? [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? movies.length + 1 : movies.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 190,
    overscan: 5,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) return;

    if (lastItem.index >= movies.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [rowVirtualizer.getVirtualItems(), movies.length, hasNextPage, isFetchingNextPage]);

  return (
    <main className={clsx("mt-[var(--header-height)] p-3")}>
      <Categories />
      {isLoading && <div>Loading...</div>}
      <div ref={parentRef} className="relative h-[85vh] overflow-auto">
        <div className="relative" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const movie = movies[virtualRow.index];

            return movie ? (
              <div
                key={virtualRow.key}
                className="absolute top-0 left-0 w-full"
                style={{ transform: `translateY(${virtualRow.start}px)` }}
              >
                <ScriptListItem {...movie} />
              </div>
            ) : (
              <div
                key={virtualRow.key}
                className="absolute top-0 left-0 w-full text-center"
                style={{ transform: `translateY(${virtualRow.start}px)` }}
              >
                {hasNextPage ? "Loading more..." : "No more items"}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

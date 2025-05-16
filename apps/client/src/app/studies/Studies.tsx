"use client";

import React, { useEffect, useRef } from "react";

import StatusQueryTags from "./_components/StatusQueryTags";
import StudyItem from "./_components/StudyItem";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { PaginationStudyResponseDto } from "@renglish/services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ActionResponse } from "@/types/action";
import getStudiesAction from "../actions/studies/getStudies";
import { useVirtualizer } from "@tanstack/react-virtual";

const PAGE_SIZE = 4;

export default function StudiesPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const parentRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<
    ActionResponse<PaginationStudyResponseDto>
  >({
    initialPageParam: 1,
    queryKey: ["studies", status],
    queryFn: ({ pageParam }) =>
      getStudiesAction({
        status: status ?? undefined,
        offset: (pageParam as number) ?? 1,
        limit: PAGE_SIZE,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      const totalPages = Math.ceil(lastPage.data.totalCount / PAGE_SIZE);
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });

  const studies = data?.pages.flatMap((page) => page.data.data) ?? [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? studies.length + 1 : studies.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 190,
    overscan: 5,
    measureElement: (element) => {
      if (element instanceof HTMLElement && element.querySelector("button")) {
        return element.offsetHeight + 15;
      }

      return 190;
    },
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) return;

    if (lastItem.index >= studies.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [rowVirtualizer.getVirtualItems(), studies.length, hasNextPage, isFetchingNextPage]);

  return (
    <main className={clsx("mt-[var(--header-height)] p-3", "flex flex-col gap-3")}>
      <StatusQueryTags />
      {isLoading && <div>Loading...</div>}
      <div ref={parentRef} className="relative h-[85vh] overflow-auto">
        <div className="relative" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const study = studies[virtualRow.index];

            return study ? (
              <div
                key={virtualRow.key}
                ref={rowVirtualizer.measureElement}
                data-index={virtualRow.index}
                className="absolute top-0 left-0 w-full"
                style={{ transform: `translateY(${virtualRow.start}px)` }}
              >
                <StudyItem {...study} />
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

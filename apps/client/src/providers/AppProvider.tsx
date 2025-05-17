"use client";

import { ENV } from "@/constants/env";
import getQueryClient from "@/libs/getQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { PropsWithChildren } from "react";

function AppProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {!ENV.IS_PRODUCTION && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default AppProvider;

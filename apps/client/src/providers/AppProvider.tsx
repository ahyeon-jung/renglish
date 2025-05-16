"use client";

import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import getQueryClient from "@/libs/getQueryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ENV } from "@/constants/env";

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

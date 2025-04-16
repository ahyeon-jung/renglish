'use client';

import { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import getQueryClient from '@/libs/getQueryClient';

function AppProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default AppProvider;

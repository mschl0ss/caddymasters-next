import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { Roboto_Slab } from 'next/font/google';
import { ReactNode } from 'react';

import UxWrapper from '@/components/UxWrapper';
import AppPageProvider from '@/contexts/AppPageContext';
import theme from '@/utils/theme';

const font = Roboto_Slab({ subsets: ['latin'] });

export const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: 'Caddymasters',
  description: 'Caddymasters app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AppPageProvider>
          <UxWrapper>
            {children}
          </UxWrapper>
        </AppPageProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

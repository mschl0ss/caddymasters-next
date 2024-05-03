import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Metadata } from 'next';
import { Roboto_Slab } from 'next/font/google';
import { ReactNode } from 'react';

import UxWrapper from '@/components/UxWrapper';
import AppPageProvider from '@/contexts/AppPageContext';
import theme from '@/utils/theme';

const font = Roboto_Slab({ subsets: ['latin'] });

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

      <AppPageProvider>
        <UxWrapper>
          {children}
        </UxWrapper>
      </AppPageProvider>

    </ThemeProvider>
  );
}

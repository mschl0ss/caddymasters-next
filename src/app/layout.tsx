import {Inter} from "next/font/google";
import "./globals.css";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import theme from "@/utils/theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import AppPageProvider from "@/contexts/AppPageContext";
import UxWrapper from "@/components/UxWrapper";
import {Metadata} from "next";
import {ReactNode} from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Caddymasters",
  description: "Caddymasters app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
          <AppRouterCacheProvider options={{ key: 'css' }}>
              <CssBaseline />
              <ThemeProvider theme={theme}>
                  <AppPageProvider>
                    <UxWrapper>
                        {children}
                    </UxWrapper>
                  </AppPageProvider>
              </ThemeProvider>
          </AppRouterCacheProvider>
      </body>
    </html>
  );
}

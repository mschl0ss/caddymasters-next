'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import theme from "@/utils/theme";
import {Box, CssBaseline, styled, ThemeProvider} from "@mui/material";
import Footer from "@/components/Footer";
import AppPageProvider, {AppPage, useAppPageContext} from "@/contexts/AppPageContext";
import AppBar from "@/components/AppBar";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Caddymasters",
//   description: "Caddymasters app",
// };


const DebugConsole = styled(Box)({
    position: 'absolute',
    left: 0,
    top: 0,
    border: 'dashed 1px black',
    width: 200,
    height: '100vh',
});

const Wrapper = styled(Box)({
    width: 450,
    margin: '0 auto',
    border: 'dashed 1px black',
    minHeight: 750,
    height: '932px',
    borderRadius: 25,
    background: 'white',
    zIndex: '100',
});

function UxWrapper({children}: Readonly<{ children: React.ReactNode; }>) {
    const { appPage } = useAppPageContext();

    const currentPage = Object.keys(AppPage)[Object.values(AppPage)
        .indexOf(appPage)];

    return (
        <>
            <DebugConsole>
                ux wrapper
                current page:
                {' '}
                {currentPage}
                <Footer />
            </DebugConsole>
            <Wrapper>
                <AppBar />
                {children}
            </Wrapper>
        </>
    )

}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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

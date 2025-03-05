'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/globalState/providers';

import LayoutWithNav from '@/components/LayoutWithNav';
import { RouteHandler } from '@/components/RouteHandler';
import Box from '@mui/material/Box';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <Providers>
            <RouteHandler>
              <LayoutWithNav>
                <Box
                  sx={{
                    width: { lg: '75vw' },
                    margin: 'auto',
                  }}
                >
                  {children}
                </Box>
              </LayoutWithNav>
            </RouteHandler>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

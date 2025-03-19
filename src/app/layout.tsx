'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/globalState/rootState/providers';

import LayoutWithNav from '@/components/LayoutWithNav';
import { RouteHandler } from '@/components/RouteHandler';
import Box from '@mui/material/Box';
import { ToastNotify } from '@/components/ToastNotify';
import { Spinner } from '@/components/Spinner';
import Script from 'next/script';

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
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-JKNVFJ95PH"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
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
                  <ToastNotify />
                  {children}
                  <Spinner />
                </Box>
              </LayoutWithNav>
            </RouteHandler>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

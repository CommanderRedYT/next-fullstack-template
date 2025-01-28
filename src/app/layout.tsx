import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import type { FC, PropsWithChildren } from 'react';

import { pageName } from '@/constants';
import { ApiStoreProvider } from '@/providers/apiStoreProvider';
import theme from '@/theme';

import { ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: {
        absolute: pageName,
        template: `%s | ${pageName}`,
    },
    description: 'My project',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
    <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <ApiStoreProvider>
                        <ApiStoreProvider>
                            <Container sx={{ mt: 2 }}>{children}</Container>
                        </ApiStoreProvider>
                    </ApiStoreProvider>
                </ThemeProvider>
            </AppRouterCacheProvider>
        </body>
    </html>
);

export default RootLayout;

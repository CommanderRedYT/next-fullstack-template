// noinspection ES6PreferShortImport

import type { NextConfig } from 'next';

import { apiBaseUrl } from './src/constants';

if (process.argv.includes('build')) {
    if (process.env.NODE_ENV !== 'production') {
        throw new Error(
            'You must build in production mode. Set NODE_ENV=production.',
        );
    }
}

if (!['development', 'production', 'test'].includes(process.env.NODE_ENV)) {
    throw new Error('Invalid NODE_ENV');
}

console.log(`====================
NODE_ENV: ${process.env.NODE_ENV}
====================`);

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    logging: {
        fetches: {
            fullUrl: true,
            hmrRefreshes: true,
        },
    },
    env: {
        API_BASE_URL: apiBaseUrl,
    },
    devIndicators: {
        appIsrStatus: true,
        buildActivity: true,
        buildActivityPosition: 'bottom-right',
    },
    compiler: {
        ...(process.env.NODE_ENV === 'production'
            ? {
                  removeConsole: {
                      exclude: ['dir'],
                  },
                  // or else playwright will break
                  reactRemoveProperties: false,
              }
            : {}),
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${apiBaseUrl}/:path*`,
            },
        ];
    },
};

export default nextConfig;

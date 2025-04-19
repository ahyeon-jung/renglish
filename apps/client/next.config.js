// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  // next.js config
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/d/**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
      '@renglish/services': require('path').resolve(__dirname, '../../packages/services/src'),
    };
    return config;
  },
  // API 라우트를 정적 내보내기에서 제외
  experimental: {
    missingSuspenseWithCSRError: false,
  },
  // API 라우트를 제외
  exclude: ['/api/**'],
});

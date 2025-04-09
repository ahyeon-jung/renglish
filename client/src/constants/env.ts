const CLIENT_ENV = {
  GA_ID: process.env.NEXT_PUBLIC_GA_ID ?? '',
  GC_ID: process.env.NEXT_PUBLIC_GC_ID ?? '',
};

export const ENV = {
  ...CLIENT_ENV,
  WEBHOOK_URL: process.env.WEBHOOK_URL ?? '',
  API_BASE_URL: process.env.API_BASE_URL ?? '',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  COOKIE_ACCESS_TOKEN_KEY: process.env.COOKIE_ACCESS_TOKEN_KEY ?? '',
  COOKIE_REFRESH_TOKEN_KEY: process.env.COOKIE_REFRESH_TOKEN_KEY ?? '',
} as const;

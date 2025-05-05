const CLIENT_ENV = {
  GA_ID: process.env.NEXT_PUBLIC_GA_ID ?? "",
  GC_ID: process.env.NEXT_PUBLIC_GC_ID ?? "",
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
};

export const ENV = {
  ...CLIENT_ENV,
  WEBHOOK_URL: process.env.WEBHOOK_URL ?? "",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  COOKIE_ACCESS_TOKEN_KEY: process.env.COOKIE_ACCESS_TOKEN_KEY ?? "",
  COOKIE_REFRESH_TOKEN_KEY: process.env.COOKIE_REFRESH_TOKEN_KEY ?? "",
  CLIENT_URL: process.env.CLIENT_URL ?? "",
} as const;

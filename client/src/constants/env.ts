const CLIENT_ENV = {};

export const ENV = {
  ...CLIENT_ENV,
  API_BASE_URL: process.env.API_BASE_URL ?? "",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
} as const;

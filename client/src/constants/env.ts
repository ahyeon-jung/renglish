const CLIENT_ENV = {};

export const ENV = {
  ...CLIENT_ENV,
  SERVER_HOST: process.env.SERVER_HOST ?? "",
  CLIENT_HOST: process.env.CLIENT_HOST ?? "",
} as const;

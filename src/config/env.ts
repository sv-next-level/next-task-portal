export type EnvConfig = typeof envConfig;

export const envConfig = {
  BASE_URL: String(process.env.BASE_URL),
};

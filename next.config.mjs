/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.APP_BASE_URL,
  },
};

export default nextConfig;

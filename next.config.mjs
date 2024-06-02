/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_GATEWAY: process.env.API_GATEWAY,
  },
};

export default nextConfig;

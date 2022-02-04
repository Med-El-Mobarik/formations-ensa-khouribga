/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    HOST_SERVER: "remotemysql.com",
    DB_NAME: "GH2YAqznzf",
    DB_USER: "GH2YAqznzf",
    DB_PASSWORD: "4TSqW68BhD",
  },
};

module.exports = nextConfig;

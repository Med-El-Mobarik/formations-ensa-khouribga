/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    HOST_SERVER: "remotemysql.com",
    DB_NAME: "GH2YAqznzf",
    DB_USER: "GH2YAqznzf",
    DB_PASSWORD: "4TSqW68BhD",
    // NEXTAUTH_SECRET: "8a49c01e1ef8edbf81892ddc8974f9c7",
  },
};

module.exports = nextConfig;

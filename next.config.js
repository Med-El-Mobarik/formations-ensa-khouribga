/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    HOST_SERVER: "",
    DB_NAME: "",
    DB_USER: "",
    DB_PASSWORD: "",
  },
};

module.exports = nextConfig;

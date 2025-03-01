/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fakestoreapi.com"], // Allow images from this domain
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
};

module.exports = nextConfig;

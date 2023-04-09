/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
        port: "",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;

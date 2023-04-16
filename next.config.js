/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gateway.pinata.cloud",
        pathname: "/ipfs/*",
        port: "",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;

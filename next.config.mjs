/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "warpads.xyz",
      },
    ],
  },
};

export default nextConfig;

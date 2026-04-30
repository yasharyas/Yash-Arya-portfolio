/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  async rewrites() {
    return [
      { source: "/ppt", destination: "/ppt/index.html" },
    ];
  },
};

export default nextConfig;

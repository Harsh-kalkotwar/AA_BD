/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/public/:path*",
      destination: "/:path*",
    },
  ],
};

export default nextConfig;

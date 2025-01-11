/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/ideas",
        destination: "https://suitmedia-backend.suitdev.com/api/ideas",
      },
    ];
  },
  images: {
    domains: ["suitmedia.static-assets.id"],
  },
};

export default nextConfig;

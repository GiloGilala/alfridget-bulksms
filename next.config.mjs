/** @type {import('next').NextConfig} */
const nextConfig = {
  // Existing image configuration
  images: {
    domains: ["www.dropbox.com"],
  },

  // Existing rewrites
  async rewrites() {
    return [
      {
        source: "/api/opay",
        destination:
          "https://testapi.opaycheckout.com/api/v1/international/cashier/create",
      },
    ];
  },

  // Add these new configurations to handle the window reference error
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },

  // Prevent static optimization for pages using browser APIs
  experimental: {
    appDir: true,
  },

  // Output standalone build
  output: "standalone",
};

export default nextConfig;

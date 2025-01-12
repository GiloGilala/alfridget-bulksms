/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.dropbox.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/opay",
        destination:
          "https://testapi.opaycheckout.com/api/v1/international/cashier/create",
      },
    ];
  },
};

export default nextConfig;

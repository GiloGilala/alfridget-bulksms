/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.dropbox.com" },
      { protocol: "https", hostname: "regeltechnology.com" },
      { protocol: "https", hostname: "**.regeltechnology.com" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/opay",
        destination:
          "https://testapi.opaycheckout.com/api/v1/international/cashier/create",
        headers: [
          {
            key: "Authorization",
            value: `Bearer ${process.env.OPAY_SECRET_KEY}`,
          },
        ],
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "script-src 'self' https://checkout.paystack.com; " +
              "style-src 'self' https://checkout.paystack.com; " +
              "frame-src https://checkout.paystack.com; " +
              "connect-src 'self' https://checkout.paystack.com https://api.paystack.co;",
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
};

export default nextConfig;

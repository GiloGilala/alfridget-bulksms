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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.paystack.com; " +
              "style-src 'self' 'unsafe-inline' https://checkout.paystack.com; " +
              "frame-src https://checkout.paystack.com; " + // Allow Paystack iframe
              "connect-src 'self' https://checkout.paystack.com;", // Allow API calls to Paystack
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

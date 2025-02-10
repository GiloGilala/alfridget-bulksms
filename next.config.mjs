/** @type {import('next').NextConfig} */
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.paystack.co;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    frame-src 'self' https://checkout.paystack.com;
`

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
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // output: "standalone",
};

export default nextConfig;

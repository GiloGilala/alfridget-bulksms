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
              "default-src 'self'; " + // Default policy: allow only resources from the same origin
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.paystack.com; " + // Allow scripts from self, Paystack, and inline scripts
              "style-src 'self' 'unsafe-inline' https://checkout.paystack.com; " + // Allow styles from self, Paystack, and inline styles
              "frame-src https://checkout.paystack.com; " + // Allow iframes from Paystack
              "connect-src 'self' https://checkout.paystack.com; " + // Allow API calls to self and Paystack
              "font-src 'self' https://checkout.paystack.com; " + // Allow fonts from self and Paystack
              "img-src 'self' data: https://checkout.paystack.com; " + // Allow images from self, data URIs, and Paystack
              "object-src 'none'; " + // Disallow plugins like Flash
              "base-uri 'self'; " + // Restrict base URLs to self
              "form-action 'self'; " + // Restrict form submissions to self
              "frame-ancestors 'self';", // Restrict embedding to self
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

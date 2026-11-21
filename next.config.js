/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Forces Cloudflare to serve the original image instantly 
    // instead of trying to resize it on the fly (which causes slow loading).
    unoptimized: true, 
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            // Forces the browser to always fetch the latest HTML on reload
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

// Initialize Cloudflare environment context for local dev
const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
initOpenNextCloudflareForDev();

module.exports = nextConfig;

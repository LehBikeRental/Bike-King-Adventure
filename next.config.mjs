/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    // Once an image is optimized at a given size, keep serving that cached
    // copy for a year instead of Next's short default TTL — repeat visits
    // shouldn't re-trigger optimization work against Vercel's/Cloudinary's quota.
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return [
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/service',
        destination: '/services',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

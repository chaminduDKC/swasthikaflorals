/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins:['192.168.8.100'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};


export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/signalr/:path*',
        destination: 'https://tech-test.raintor.com/Hub/:path*', // Proxy path
      },
    ];
  },
};

export default nextConfig;

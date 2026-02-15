/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
  },
  images: {
    domains: ['localhost', 'your-backend-domain.vercel.app'], // Add your production domain here
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@mypartner/common', '@mypartner/my-portfolio'],
}

export default nextConfig

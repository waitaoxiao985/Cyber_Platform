/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  outputFileTracingIncludes: {
    "**/*.prisma": [
      "node_modules/.prisma/client/**/*",
    ],
  },
}

export default nextConfig
// next.config.js

const nextConfig = {
  compress: true,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID, // ← Add this
  },
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  }
}

module.exports = nextConfig
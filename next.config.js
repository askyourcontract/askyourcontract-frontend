// next.config.js

const nextConfig = {
  compress: true, // Enables Gzip compression for JS and CSS
  reactStrictMode: true,
  api: {
    bodyParser: {
      sizeLimit: '20mb', // or higher if needed
    },
  },
}

module.exports = nextConfig
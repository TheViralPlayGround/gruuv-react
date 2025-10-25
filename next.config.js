/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static generation
  staticPageGenerationTimeout: 1000,
  // Force dynamic rendering
  trailingSlash: false,
}

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export configuration per PRD.md Section 5 (Performance)
  output: 'export',
  distDir: 'dist',
  
  // Image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Trailing slashes for clean URLs
  trailingSlash: true,
  
  // Strict mode for React best practices
  reactStrictMode: true,
};

module.exports = nextConfig;

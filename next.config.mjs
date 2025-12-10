/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Cloudflare Pages deployment
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Video files in public/ folder are automatically served by Next.js
  // No webpack/turbopack config needed for static assets
};

export default nextConfig;

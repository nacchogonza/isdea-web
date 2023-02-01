/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "localhost", "sicos-cursos.vercel.app/", "seashell-app-cmgy6.ondigitalocean.app", "https://res.cloudinary.com"],
  },
  env: {
    NEXT_PUBLIC_PAGE_ID: process.env.NEXT_PUBLIC_PAGE_ID,
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        '@sentry': {
          test: /[\\/]node_modules[\\/](@sentry)[\\/]/,
          name: '@sentry',
          priority: 10,
          reuseExistingChunk: false,
        },
      };
    }
  
    return config;
  },
};

module.exports = nextConfig;



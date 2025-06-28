import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration options
  reactStrictMode: true,
  
  // Experimental features untuk mengurangi hydration issues
  experimental: {
    optimizeCss: true,
  },

  // Webpack configuration untuk development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Mengurangi hydration warnings di development
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 40,
              enforce: true,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;

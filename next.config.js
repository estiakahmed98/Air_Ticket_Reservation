/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Required for Firebase Auth to work with Next.js
  transpilePackages: [
    'firebase',
    '@firebase/auth',
    '@firebase/app',
    '@firebase/firestore',
    '@firebase/util',
    'undici',
  ],
  // Enable React Strict Mode
  reactStrictMode: true,
};

module.exports = nextConfig;

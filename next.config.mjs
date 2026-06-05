/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /* Allow external images from Figma S3 (used for product/hero images) */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
      },
    ],
  },
};

export default nextConfig;

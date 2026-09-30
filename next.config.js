/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "cdn.dummyjson.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "api.mobilaty.com" },
      { protocol: "https", hostname: "www.spigen.com" },
      { protocol: "https", hostname: "cdn.spigen.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "*.static.pub" },
    ],
  },
};

module.exports = nextConfig;

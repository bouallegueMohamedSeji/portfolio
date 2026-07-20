/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export so GitHub Pages can serve it (no Node server).
  output: 'export',
  // No basePath: served from the custom domain root (see public/CNAME).
  images: { unoptimized: true },
  // GitHub Pages serves /path/ as /path/index.html — trailing slashes keep links stable.
  trailingSlash: true,
};

export default nextConfig;

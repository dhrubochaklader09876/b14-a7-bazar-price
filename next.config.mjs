/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["better-auth", "mongodb"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;




// ------------------



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   serverExternalPackages: ["better-auth", "mongodb"],
// };

// export default nextConfig;
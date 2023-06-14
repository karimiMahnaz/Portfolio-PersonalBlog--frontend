// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
// }

// module.exports = nextConfig 

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig


const path = require('path')

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  trailingSlash: true,
 
  images: {
    loader: "imgix",
    path: "/public/assets",
    unoptimized: true,
  },
  
  
}

  
    // module.exports = withCss(
    //   withSass(
    //     withTM({
    //       transpileModules: ["react-bulma-components"],
    //       sassLoaderOptions: {
    //         includePaths: ["./components"]
    //       },
    //       exportPathMap: async function(
    //         defaultPathMap,
    //         { dev, dir, outDir, distDir, buildId }
    //       ) {
    //         return {
    //           "/": { page: "/" },
    //           "/blog": { page: "/blog" },
    //           "/aboutMe": { page: "/aboutMe" },
    //           "/contact": { page: "/contact" },
    //           "/projects": { page: "/projects" }
    //         };
    //       }
    //     })
    //   )
    // );

    module.exports = nextConfig
/** @type {import('next').NextConfig} */
// const withCSS = require("@zeit/next-css");

// if (typeof require !== "undefined") {
//     require.extensions[".less"] = () => { };
//     require.extensions[".css"] = file => { };
// }

// const nextConfig = withCSS({
//     webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
//         // Perform customizations to webpack config
//         // Important: return the modified config
//         return config;
//     },
//     webpackDevMiddleware: config => {
//         // Perform customizations to webpack dev middleware config
//         // Important: return the modified config
//         return config;
//     }
// });

const nextConfig = {
    output: 'export'
}

module.exports = nextConfig

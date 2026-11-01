/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.resolve.alias['@'] = path.join(__dirname);
    return config;
  },
};
module.exports = module.exports;
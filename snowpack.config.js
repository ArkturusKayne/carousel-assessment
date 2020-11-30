// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    ["@snowpack/plugin-optimize"],
    ["@snowpack/plugin-sass"]
  ],
  // installOptions: {},
  // devOptions: {},
  // buildOptions: {},
};

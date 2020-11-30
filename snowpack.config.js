// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  // mount: {},
  plugins: [
    ["@snowpack/plugin-optimize"],
    ["@snowpack/plugin-sass"]
  ],
  // installOptions: {},
  // devOptions: {},
  // buildOptions: {},
};

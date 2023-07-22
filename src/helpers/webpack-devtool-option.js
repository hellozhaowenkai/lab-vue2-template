/**
 * https://webpack.js.org/configuration/devtool/
 * https://webpack.js.org/guides/build-performance/#devtool
 */

module.exports = function (isProduction = false) {
  const productionOptions = [
    // Recommended choice for production builds with maximum performance.
    false,
    // Recommended choice for production builds with high quality SourceMaps.
    "source-map",
    // Possible choice when using SourceMap only for error reporting purposes.
    "hidden-source-map",
  ];

  const developmentOptions = [
    // Recommended choice for development builds with maximum performance.
    "eval",
    // Recommended choice for development builds with high quality SourceMaps.
    "eval-source-map",
    // Tradeoff choice for development builds.
    "eval-cheap-source-map",
    // Tradeoff choice for development builds.
    "eval-cheap-module-source-map",
  ];

  return isProduction
    ? productionOptions[0] // Source maps are really expensive. Do you really need them?
    : developmentOptions[3]; // In most cases, this is the best option.
};

const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
const $projectConfig = require("./config");
const $isProduction = process.env.NODE_ENV === "production";

/**
 * @type {import("@vue/cli-service").ProjectOptions}
 */
module.exports = defineConfig({
  // The base URL your application bundle will be deployed at.
  publicPath: $isProduction ? $projectConfig["base"]["base-url"] : "/",
  // The directory where the production build files will be generated in when running `vue-cli-service build`.
  outputDir: "dist",
  // A directory (relative to `outputDir`) to nest generated static assets (js, css, img, fonts) under.
  assetsDir: "",
  // Specify the output path for the generated `index.html` (relative to `outputDir`).
  indexPath: "index.html",
  // By default, generated static assets contains hashes in their filenames for better caching control.
  filenameHashing: true,
  // Build the app in multi-page mode.
  pages: undefined,
  // Whether to perform lint-on-save during development using `eslint-loader`.
  lintOnSave: "default",
  // Whether to use the build of Vue core that includes the runtime compiler.
  runtimeCompiler: false,
  // By default `babel-loader` ignores all files inside `node_modules`.
  transpileDependencies: ["vuetify"],
  // Setting this to `false` can speed up production builds if you don't need source maps for production.
  productionSourceMap: true,
  // Configure the `crossorigin` attribute on `<link rel="stylesheet">` and `<script>` tags in generated HTML.
  crossorigin: undefined,
  // Set to `true` to enable `Subresource Integrity` (SRI) on `<link rel="stylesheet">` and `<script>` tags in generated HTML.
  integrity: false,

  configureWebpack: (config) => {
    return {
      devtool: $isProduction ? "source-map" : "eval-source-map",

      plugins: [
        new webpack.DefinePlugin({
          __PROJECT_CONFIG__: JSON.stringify($projectConfig),
        }),
      ],

      // externals: {
      //   lodash: {
      //     commonjs: "lodash",
      //     amd: "lodash",
      //     root: "_",
      //   },
      // },

      // module: {
      //   rules: [
      //     {
      //       test: /\.toml$/i,
      //       type: "json",
      //       parser: {
      //         parse: toml.parse,
      //       },
      //     },
      //   ],
      // },
    };
  },

  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = $projectConfig["base"]["website-title"];
      return args;
    });

    // config.module
    //   .rule("vue")
    //   .use("vue-loader")
    //   .tap((options) => {
    //     // modify the options...
    //     return options;
    //   });
  },

  css: {
    extract: $isProduction,
    sourceMap: true,
    loaderOptions: {
      // scss: {
      //   additionalData: `@import "~@/variables.scss";`,
      // },
    },
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    client: {
      // Shows a full-screen overlay in the browser when there are compiler errors or warnings.
      overlay: {
        warnings: false,
        errors: true,
      },
    },

    // https://github.com/chimurai/http-proxy-middleware/
    proxy: {
      "^/i-need-a-proxy/": {
        target: "https://lailai.link/api/",
        changeOrigin: true,
        // bypass(request, response, proxyOptions) {
        //   console.log(`capturing ${request.url}`);
        // },
        pathRewrite(path, request) {
          // console.log(`rewriting ${request.url}`);

          const ruler = { "^/i-need-a-proxy/": "/" };
          let newPath = path;
          for (const [key, value] of Object.entries(ruler))
            newPath = newPath.replace(new RegExp(key), value);
          return newPath;
        },
      },
    },
  },

  // Whether to use `thread-loader` for Babel or TypeScript transpilation.
  // parallel: require("os").cpus().length > 1,

  // Pass options to the `PWA Plugin`.
  pwa: {
    // themeColor: "#4DBA87",
    // msTileColor: "#000000",
  },

  // This is an object that doesn't go through any schema validation, so it can be used to pass arbitrary options to 3rd party plugins.
  pluginOptions: {
    // foo: {
    //   // plugins can access these options as `options.pluginOptions.foo`.
    // },
  },
});

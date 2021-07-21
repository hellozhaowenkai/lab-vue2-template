const webpack = require("webpack");
const $projectConfig = require("./config");

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? $projectConfig["base"]["base-url"]
      : "/",

  productionSourceMap: false,

  css: {
    sourceMap: true,
  },

  configureWebpack: {
    devtool: "source-map",

    plugins: [
      new webpack.DefinePlugin({
        $PROJECT_CONFIG: JSON.stringify($projectConfig),
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
  },

  devServer: {
    overlay: {
      warnings: false,
      errors: true,
    },

    // https://cli.vuejs.org/config/#devserver
    // https://webpack.js.org/configuration/dev-server/#devserverproxy
    // https://github.com/chimurai/http-proxy-middleware
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
};

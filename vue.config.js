module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? process.env.VUE_APP_ROOT : "./",

  productionSourceMap: false,

  css: {
    sourceMap: true,
  },

  configureWebpack: {
    devtool: "source-map",
  },

  devServer: {
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/api/": {
        target: "http://localhost:8000/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};

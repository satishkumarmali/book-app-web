module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "shilp/scss/_globals.scss";'
      }
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        "@icon": "vue-material-design-icons"
      }
    }
  },

  publicPath: "",
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined
};

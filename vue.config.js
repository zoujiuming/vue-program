module.exports = {
  devServer: {
    open: true,
    port: 4000
  },
  configureWebpack: {
    // 排除打包的内容
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      axios: 'axios'
    }
  }
}

module.exports = {
  // 配置bootstrap
  configureWebpack: {
    plugins: [],
    // 路径别名
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'router': '@/assets',
        'views': '@/views',
        'utils': '@/utils'
      }

    }
  },

  devServer: {
    port: 8081,
    open: true
  }
}
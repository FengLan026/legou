const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8888,
    // 代理配置
    proxy: {
      '/bufan': {
        target: 'http://shop.bufantec.com',
        changeOrigin: true,
      },
    }
  }
})

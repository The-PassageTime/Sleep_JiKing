const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
    devServer: {
    proxy: {
        '/api': {
            target: 'http://localhost:8080',
            //允许跨域
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/api': '/'
            }
        }
    }
}
})

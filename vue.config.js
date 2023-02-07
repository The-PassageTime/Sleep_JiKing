const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
    devServer: {
        host: '0.0.0.0',
	    port: 8080,
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

// const webpack = require('webpack')
module.exports = {

	devServer: {
		proxy: {    //配置代理        
			'/api': {  //设置拦截器  
				target: 'http://47.96.158.85:9999', //代理的目标地址
				changeOrigin: true, //开启跨域
				pathRewrite: {
					'^/api': '/'
				}
			}
		}
	},
	publicPath: './'
}
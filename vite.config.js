import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  	plugins: [vue()],
  	// 为 ./src 提供别名 @
	resolve: {
		alias: {
			'@': 'G:/Large_screen_visualization_jishe/visual_jishe/src'
		}
	},
	// 主动开启热更新
	server: {
		hmr: true
	}
})
//vue.config.js
// module.exports = defineConfig({
// 	devServer: {
// 	  port:8000,
// 	  proxy: {
// 		'/api': {                //   /api是习惯性的写法，可以随意改
// 		  target: 'http://localhost', //接口域名(文件服务器域名)
// 		  changeOrigin: true,             //是否跨域
// 		  ws: true,                       //是否代理 websockets
// 		  secure: true,                   //是否https接口
// 		  pathRewrite: {                  //路径重置
// 			'^/api': ''
// 		  }
// 		}
// 	  }
// 	}
//   })
const path = require('path')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  devServer: {
    open: true,
    // proxy: {
    //   '/api': { // 请求的代称,如果我们发出的请求的根地址是以/api开始的话,那么就会被拦截下来,将/api替换为空,然后真实发出的
    //     // 请求是 http://localhost:5000,/api这个地址则会变为空,通常我们可在axios中配置请求根地址,那么所有ajax请求就都会在
    //     // 请求的前面自动加上/api
    //     target: 'http://localhost:4005', // 配置真正请求到的地址
    //     ws: true, // proxy websockets
    //     changeOrigin: true, // 允许跨域
    //     pathRewrite: { // 替换，将请求地址后面的/api 替换为 ''空
    //       '^/api': '' // rewrite path
    //     }
    //   }
    // }
  },
  // vue想要修改原配置，那么需要加上这么一个属性
  chainWebpack: config => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
    config.module
      .rule('sass')
      .oneOf('vue')
      .use('px2rem-loader')
      .loader('px2rem-loader')
      .before('postcss-loader') // this makes it work.
      .options({
        remUnit: 75
      })
      .end()
    // 通过这种链式方式来设置文件路径的别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('~styles', resolve('/src/assets/styles'))
      .set('mixins', resolve('src/mixins'))
      .set('components', resolve('src/components'))
  }
}

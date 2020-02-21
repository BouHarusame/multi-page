'use strict'
const conf = require('./config/moduleConfig')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const name = 'vue Element Admin' // page title
const port = process.env.port || process.env.npm_config_port || 9527 // dev port
module.exports = {
  pages: conf.pages,
  //  {
  // projectA: {
  //   // page 的入口
  //   entry: 'src/views/projectA/main.js',
  //   // 模板来源
  //   template: 'public/projectA.html',
  //   // 在 dist/index.html 的输出
  //   filename: 'projectA.html',
  //   // 当使用 title 选项时，
  //   // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //   title: 'Index Page',
  //   // 在这个页面中包含的块，默认情况下会包含
  //   // 提取出来的通用 chunk 和 vendor chunk。
  //   chunks: ['chunk-vendors', 'chunk-common', 'projectA']
  // },
  // projectB: {
  //   // page 的入口
  //   entry: 'src/views/projectB/main.js',
  //   // 模板来源
  //   template: 'public/projectB.html',
  //   // 在 dist/index.html 的输出
  //   filename: 'projectB.html',
  //   // 当使用 title 选项时，
  //   // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //   title: 'Index Page',
  //   // 在这个页面中包含的块，默认情况下会包含
  //   // 提取出来的通用 chunk 和 vendor chunk。
  //   chunks: ['chunk-vendors', 'chunk-common', 'projectB']
  // }
  // },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // outputDir: '/usr/local/anycasePc',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  configureWebpack: () => {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    if (process.env.NODE_ENV === 'production') {
      // 返回一个将会被合并的对象
      return {
        performance: {
          hints: 'warning',
          // 入口起点的最大体积 整数类型（以字节为单位）
          maxEntrypointSize: 50000000,
          // 生成文件的最大体积 整数类型（以字节为单位 300k）
          maxAssetSize: 30000000,
          // 只给出 js 文件的性能提示
          assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js')
          }
        },
        externals: {
          'BMap': 'BMap',
          'BMapLib': 'BMapLib'
        },
        optimization: {
          minimizer: [
            new TerserPlugin({
              sourceMap: false,
              terserOptions: {
                compress: {
                  drop_console: true
                }
              }
            })
          ]
        },
        name: name,
        resolve: {
          alias: {
            '@': resolve('src'),
            'api': resolve('src/api'),
            'utils': resolve('src/utils'),
            'assets': resolve('src/assets'),
            'styles': resolve('src/styles'),
            'components': resolve('src/components'),
            'clientApi': resolve('src/pages/client/api'),
            'clientViews': resolve('src/pages/client/views'),
            'client-components': resolve('src/pages/client/components')
          }
        }
      }
    } else {
      return {
        name: name,
        externals: {
          'BMap': 'BMap',
          'BMapLib': 'BMapLib'
        },
        resolve: {
          alias: {
            '@': resolve('src'),
            'api': resolve('src/api'),
            'utils': resolve('src/utils'),
            'assets': resolve('src/assets'),
            'styles': resolve('src/styles'),
            'components': resolve('src/components'),
            'clientApi': resolve('src/pages/client/api'),
            'clientViews': resolve('src/pages/client/views'),
            'client-components': resolve('src/pages/client/components')
          }
        }
      }
    }
  },
  chainWebpack (config) {
    config.plugins.delete('preload-index') // TODO: need test
    config.plugins.delete('prefetch-index') // TODO: need test
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          // config
          //   .optimization.splitChunks({
          //     chunks: 'all'
          //     cacheGroups: {
          //       libs: {
          //         name: 'chunk-libs',
          //         test: /[\\/]node_modules[\\/]/,
          //         priority: -10,
          //         chunks: 'all' // only package third parties that are initially dependent
          //       },
          //       elementUI: {
          //         name: 'chunk-elementUI', // split elementUI into a single package
          //         priority: -20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          //         test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          //       },
          //       commons: {
          //         name: 'chunk-commons',
          //         test: resolve('src/components'), // can customize your rules //  minimum common number
          //         priority: -5
          //       }
          //     }
          //   })
        }
      )
  }
}

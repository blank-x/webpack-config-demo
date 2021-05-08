const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: ["./src/main.js"]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: ['node_modules'], // 查询模块的路径，默认node_modules 可以添加其他的
    mainFields: ['browser', 'module', 'main'],
    alias: {
      'src': resolve('../src'),
    }
  },
  module: {
    noParse: /jquery|loadsh/, // 不解析模块，优化构建速度
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, //10K
              esModule: false,
              name: '[name]_[hash:6].[ext]',
              outputPath: 'assets/img'
            },
          }
        ],

        exclude: /node_modules/
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name]_[hash:6].[ext]',
          outputPath: 'assets/fonts'
        }
      },

    ]
  },
  externals:{
    // 在代码中通过 import $ from 'jquery'
    // jQuery 是jquery暴露出来的全局变量
    // jquery:'jQuery'
  },
  plugins: [
    /*
    * 定义全局变量
    * 需要npm i jquery
    * 还没想到有用的地方
    * */
    // new webpack.ProvidePlugin({
    //   Vue: ['vue/dist/vue.esm.js', 'default'],
    //   _$: 'jquery'
    // }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'a.b.c': /\a/,
      PRODUCTION: true,
      VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: function () {
        console.log(1);
      },
      TWO: '1+1',
      'process.env.PROJECT_ENV': {
        name: {
          "a.b.c": 1
        }
      },
    }),
    // new FriendlyErrorsWebpackPlugin(),
    /*
    * 和网上的不一样 api天天变
    * */
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    })
  ]
}

var path = require('path')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const {merge} = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

const config = require('../src/template/config').build

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}


var webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {},
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],

  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader'
          },
          'less-loader'
        ],
        exclude: /node_modules/
      },
    ]
  },
  devtool: false,
  optimization: {
    moduleIds: 'deterministic',
    minimize: true, // production 下默认为true
    runtimeChunk: 'single',
    splitChunks:{
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]moment/,
          name: 'moment',
          chunks: 'all',
        },
      },
    }

    // runtimeChunk:true
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //不删除dll目录
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('src/template/index.html'),
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false, //是否折叠空白
      },
      config: config.template,
      tinyPath: './static'
    }),

    new CopyWebpackPlugin({
      patterns: [
        {from: path.resolve(__dirname, '../static'), to: path.resolve(__dirname, '../dist/static')},
      ],
      options: {}
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      //个人习惯将css文件放在单独目录下
      //publicPath:'../'   //如果你的output的publicPath配置的是 './' 这种相对路径，那么如果将css文件放在单独目录下，记得在这里指定一下publicPath
    }),
    new CssMinimizerWebpackPlugin()
  ],

})

if (false) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig


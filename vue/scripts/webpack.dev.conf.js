const path = require('path')
const {merge} = require('webpack-merge')
const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

var baseWebpackConfig = require('./webpack.base.conf')
const config = require('../src/template/config').dev

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}


Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./scripts/hot-reload-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  entry: {},
  output: {},
  resolve: {
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {loader: 'postcss-loader'},
          'less-loader'],
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dist', 'dll', 'manifest.json')
    }),
    new AddAssetHtmlPlugin({ filepath: resolve( '/dist/dll/vue.dll.8e9882.js') }),
    new webpack.ProgressPlugin()
  ]
})

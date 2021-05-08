var opn = require('opn')
var path = require('path');
var express = require('express');
var webpack = require('webpack');
const {createProxyMiddleware} = require('http-proxy-middleware');

var webpackConfig = require('./webpack.dev.conf');
var htmlWebpackPlugin = require('html-webpack-plugin')
const proxyTable = require('../config/proxyTable')
var port = 10300;
var autoOpenBrowser = false;

var app = express();
var compiler = webpack(webpackConfig);

// 引入webpack-dev-middleware模块
// webpack-dev-middleware是基于连接的中间件
// 它使用webpack对资源进行资源编译并暂存在内存中
// 将编译后的文件暂存在内存中

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = {target: options}
//   }
//
//   app.use(proxyMiddleware(options.filter || context, options))
// });

var devMiddleware = require('webpack-dev-middleware')(compiler);

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
    console.log('sdsdlogsd');
  }
});

// 当html-webpack-plugin模板改变的时候强制刷新页面
compiler.hooks.compilation.tap('my-reload-plugin', (compilation) => {
  // 最新的api 获取hook的方式发生了变化
  htmlWebpackPlugin.getHooks(compilation).afterEmit.tapAsync('my-reload-plugin', (data, cb) => {
      hotMiddleware.publish({action: 'reload'});
      cb()
    }
  );
});


// compiler.apply(new DashboardPlugin());


app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);


app.use(hotMiddleware);


var uri = 'http://localhost:' + port

app.use('/static', express.static(path.join(__dirname, '../static')));

// app.use(express.static());

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
});

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser) {
    opn(uri)
  }
});

// var server = require('pushstate-server');
var opn = require('opn')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack');
var dllConfig = require('./webpack.dll.conf');


// var spinner = ora('building for ' + process.env.NODE_ENV + '...')
// spinner.start()

webpack(dllConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))

})

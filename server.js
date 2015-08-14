/* eslint-disable no-var */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config =
  process.env.NODE_ENV === 'development'
  ? require('./webpack.config.dev')
  : require('./webpack.config.prod');

var server = new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  contentBase: config.output.path,
  publicPath: config.output.publicPath,
  stats: { colors: true }
});

server.listen(3000, '0.0.0.0', function(err) {
  if (err) console.log(err);
  console.log('Listening at localhost:3000');
});

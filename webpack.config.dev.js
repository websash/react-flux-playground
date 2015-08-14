/* eslint-disable no-var */
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');
var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './app/main.jsx'
  ],

  output: {
    filename: 'app.js',
    path: path.resolve('./dist'),
    publicPath: 'http://localhost:3000/static/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?optional=runtime&stage=0'],
        exclude: /node_modules/, include: path.resolve('./app')
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader' +
            '?module' +
            '&sourceMap' +
            '&importLoaders=1' +
            '&localIdentName=[name]__[local]__[hash:6]' +
            '!postcss'
      },
      { test: /\.svg$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(png|jpg)$/, loader: 'url?limit=10000' }
    ]
  },

  postcss: function() {
    // The context of this function is the webpack loader-context
    // see: http://webpack.github.io/docs/loaders.html#loader-context
    return [
      require('postcss-import')({
        // see postcss-import docs to learn about onImport callback
        // https://github.com/postcss/postcss-import
        onImport: function(files) {
          files.forEach(function(file) {
            this.addDependency(file);
            // console.log('Watching %s', file);
          }.bind(this));
        }.bind(this)
      }),
      require('postcss-custom-media'),
      require('postcss-custom-properties')(),
      require('postcss-color-hex-alpha')(),
      require('postcss-color-function')(),
      require('autoprefixer-core')({
        browsers: ['last 2 versions']
      })
    ];
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  devtool: 'eval-source-map'
}

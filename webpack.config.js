/* eslint-disable no-var */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var path = require('path');

module.exports = {
  entry: ['webpack/hot/dev-server', './app/main.jsx'],

  output: {
    filename: 'app.js',
    path: path.resolve('./dist'),
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?optional=runtime&stage=0',
        exclude: /node_modules/, include: path.resolve('./app')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader',
          'css-loader?module&importLoaders=1&localIdentName=' +
          (process.env.NODE_ENV === 'development' ? '[name]__[local]__[hash:6]' : '_[hash:6]') +
          '&sourceMap!postcss-loader')
      },
      { test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
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
          console.log('Postcss-onImport:');
          files.forEach(function(file) {
            this.addDependency(file);
            console.log('Watching %s', file);
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

  externals: {
    'react': 'React'
  },

  plugins: [
    new ExtractTextPlugin('styles.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  devtool: 'source-map'
}

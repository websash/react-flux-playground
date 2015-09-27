/* eslint-disable no-var */
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var WebpackNotifierPlugin = require('webpack-notifier')
var path = require('path')

module.exports = {
  entry: './app/main.jsx',

  output: {
    filename: 'app.js',
    path: path.resolve('./dist'),
    publicPath: '/static/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?optional=runtime&stage=0'],
        exclude: /node_modules/, include: path.resolve('./app')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style',
          'css-loader' +
            '?module' +
            '&sourceMap' +
            '&importLoaders=1' +
            '&localIdentName=[hash:6]' +
            '&minimize&fonts=false' + // https://github.com/ben-eb/postcss-font-family/issues/3
            '!postcss')
      },
      { test: /\.svg$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(png|jpg)$/, loader: 'url?limit=10000' }
    ]
  },

  postcss: function() {
    return [
      require('postcss-import')({
        onImport: function(files) {
          files.forEach(function(file) {
            this.addDependency(file)
          }.bind(this))
        }.bind(this)
      }),
      require('postcss-custom-media'),
      require('postcss-custom-properties')(),
      require('postcss-color-hex-alpha')(),
      require('postcss-color-function')(),
      require('autoprefixer-core')({
        browsers: ['last 2 versions']
      })
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new ExtractTextPlugin('styles.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false }
    }),
    new WebpackNotifierPlugin()
  ],

  devtool: 'source-map'
}

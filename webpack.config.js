/* eslint-env node */
const path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// A list of 3rd party packages to be bundled separately for caching purposes.
// Example: [ 'react', 'lodash', 'redux', 'react-redux', 'react-dom' ]
const VENDOR_LIBS = []

const config = {
  entry: {
    bundle: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        use: ExtractTextPlugin.extract({use: 'css-loader!postcss-loader'}),
        test: /\.css$/
      }, {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 40000
            }
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new ExtractTextPlugin('style.[chunkhash].css'),
    new HtmlWebpackPlugin({template: 'src/index.html'})
  ]
};

// Add VENDOR_LIBS to config.entry.vendor if it contains packages
if (VENDOR_LIBS.length) {
  config.entry.vendor = VENDOR_LIBS;
}

module.exports = config;

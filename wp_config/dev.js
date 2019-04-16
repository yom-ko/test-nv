const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

// Webpack plugins
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Config constants
const ROOT = path.resolve(__dirname, '../');
const OUTPUT = `${ROOT}/build`;

const common = require('./common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: OUTPUT,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
    clientLogLevel: 'warning'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: ['css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        // browse to http://localhost:3000/ during development
        host: '192.168.1.10',
        port: 3000,
        // proxy the Webpack Dev Server endpoint through BrowserSync
        proxy: 'http://localhost:8080/',
        notify: false
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }
    )
  ]
});

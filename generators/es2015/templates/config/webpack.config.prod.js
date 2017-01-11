const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const pluginName = '<%= name %>'

module.exports = {
  entry: {
    'plugin': './src/index.js',
    'plugin.min': './src/index.js'
  },
  output: {
    path: path.join(__dirname, '../dist', pluginName),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../src/LICENSE'),
        to: path.join(__dirname, '../dist', pluginName)
      }
    ])
  ]
}

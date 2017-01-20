const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const pluginName = "<%= name %>";

module.exports = {
  entry: {
    "plugin": "./src/index.ts",
    "plugin.min": "./src/index.ts"
  },
  output: {
    path: path.join(__dirname, "../dist", pluginName),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
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
        from: path.join(__dirname, "../src/LICENSE"),
        to: path.join(__dirname, "../dist", pluginName)
      }
    ])
  ]
};

var path = require("path");
var webpack = require("webpack");
var BowerWebpackPlugin = require('bower-webpack-plugin');
module.exports = {
  cache: true,
  entry: {
    phonecat: __dirname + "/assets/modules/index.js"
  },
  output: {
    path: path.join(__dirname, "public/bundle"),
    filename: "[name].js",
    chunkFilename: "[chunkhash].js"
  },
  module: {
    loaders: [
      { test: /\.css$/,loader: "style-loader!css-loader" },
      {test: /\.scss$/,loader: "style!css!sass"},
      { test: /\.jade$/, loader: "jade" }

    ]
  },
  resolve: {
    alias: {
      // Bind version of jquery
      jquery:  "/assets/bower_components/jquery/dist/jquery.js",
    }
  },
  plugins: [
    new BowerWebpackPlugin({
        modulesDirectories: ['assets/bower_components'],
        manifestFiles: ['bower.json', '.bower.json'],
        includes: /.*/,
        excludes: /.*\.less$/
    })
  ]
};
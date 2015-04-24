var path = require("path");
var webpack = require("webpack");
var BowerWebpackPlugin = require('bower-webpack-plugin');
var bourbon = require('node-bourbon').includePaths;
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
  externals: {
      // require("jquery") is external and available
      //  on the global var jQuery
      "jquery": "jQuery"
  },
  module: {
    loaders: [
      { test: /\.css$/,loader: "style-loader!css-loader" },
      { test: /\.jade$/, loader: "jade" },
      { test: /\.json$/, loader: 'json' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.scss$/, loader: "style!css!sass?includePaths[]=" + bourbon }

    ]
  },
  resolve: {
    alias: {
      // Bind version of jquery
      jquery:  "/assets/bower_components/jquery/dist/jquery.js",
    },
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.json']
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
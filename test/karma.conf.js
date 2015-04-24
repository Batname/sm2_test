'use strict';

// изучить https://github.com/packetloop/angular-webpack

var webpackConfig = require('./../webpack.config');
webpackConfig.cache = true;
webpackConfig.module.postLoaders = [{
  test: /\.js$/,
  exclude: /(_spec|vendor|node_modules)/,
  loader: 'istanbul-instrumenter'
}];


module.exports = function(config){
  config.set({

    basePath : '../',

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'assets/**/*_spec.js'
    ],
    webpack: {
      resolve: webpackConfig.resolve,
      module: webpackConfig.module
    },
    preprocessors: {
      'assets/**/*_spec.js': ['webpack']
    },

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-phantomjs-launcher',
            "karma-webpack",
            "karma-mocha"
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      subdir: function (browser) {
        return browser.toLowerCase().split(/[ /-]/)[0];
      },
      reporters: [
        {type: 'cobertura', file: 'cobertura.xml'},
        {type: 'text', file: 'text.txt'},
        {type: 'text-summary', file: 'text-summary.txt'},
        {type: 'html'}
      ]
    },

    singleRun: true,
    autoWatch : false,
    colors: true

  });
};

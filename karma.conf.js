var webpackConfig = require('./webpack.config')[0];
var webpack = require('webpack');

const path = require('path');
const phaserModulePath = path.join(__dirname, '/node_modules/phaser-ce/');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ["mocha"],
    files: [
      'node_modules/phaser-ce/build/custom/pixi.js',
      'node_modules/phaser-ce/build/custom/p2.js',
      'node_modules/phaser-ce/build/custom/phaser-split.js',
      "test/*.ts",
      "test/**/*.ts"
    ],
    preprocessors: {
        "src/*.ts": ["webpack"],
        "src/**/*.ts": ["webpack"],
        "test/*.ts": ["webpack"],
        "test/**/*.ts": ["webpack"]
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    reporters: ["progress"],
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    browsers: ["Chrome"]
  });
};

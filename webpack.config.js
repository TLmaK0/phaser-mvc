const path = require('path');
const phaserModulePath = path.join(__dirname, '/node_modules/phaser-ce/');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const glob = require("glob");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

module.exports = [
  {
    externals: {
      'phaser-ce': 'phaser-ce'
    },
    entry: path.resolve(__dirname, 'src/bootstrap.ts'),
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'phaser-mvc.min.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      modules: [ path.join(__dirname, 'node_modules'), path.join(__dirname, 'src') ]
    },
    module: {
      loaders: [
        { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
    },
    devtool: 'inline-source-map',
    plugins: [
      new DtsBundlePlugin(),
      new UglifyJSPlugin(),
      new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: 'phaser-ce',
            entry: 'build/custom/p2.min.js',
            global: 'p2'
          },
          {
            module: 'phaser-ce',
            entry: 'build/custom/pixi.min.js',
            global: 'PIXI'
          },
          {
            module: 'phaser-ce',
            entry: 'build/custom/phaser-split.min.js',
            global: 'Phaser'
          }
        ]
      })
    ]
  }
];

function DtsBundlePlugin(){}
DtsBundlePlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', function(){
    var dts = require('dts-bundle');

    dts.bundle({
      name: 'phaser-mvc',
      main: 'lib/typings/**/*.d.ts',
      out: '../index.d.ts',
      removeSource: true,
      outputAsModuleFolder: true // to use npm in-package typings
    });
  });
};

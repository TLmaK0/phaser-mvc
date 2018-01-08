const path = require('path');
const phaserModulePath = path.join(__dirname, '/node_modules/phaser-ce/');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = [
  {
    externals: {
      'phaser-ce': 'phaser-ce'
    },
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'phaser-mvc.min.js',
      library: '',
      libraryTarget: 'commonjs'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      modules: [ path.join(__dirname, 'node_modules'), path.join(__dirname, 'src') ],
      alias: {
        'phaser': path.join(phaserModulePath, 'build/custom/phaser-split.js'),
        'pixi': path.join(phaserModulePath, 'build/custom/pixi.js'),
        'p2': path.join(phaserModulePath, 'build/custom/p2.js')
      }
    },
    module: {
      loaders: [
        { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
    },
    devtool: 'inline-source-map',
    plugins: [
      new DtsBundlePlugin(),
//      new UglifyJSPlugin(),
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

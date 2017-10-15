const path = require('path');
const phaserModulePath = path.join(__dirname, '/node_modules/phaser-ce/');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  externals: {
    'phaser-ce': 'phaser-ce',
    'phaser': 'phaser',
    'pixi': 'pixi',
    'p2': 'p2'
  },
  entry: path.resolve(__dirname, 'src/bootstrap.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'phaser-mvc.min.js'
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
      { test: /pixi\.js/, use: 'expose-loader?PIXI' },
      { test: /phaser-split\.js$/, use: 'expose-loader?Phaser' },
      { test: /p2\.js/, use: 'expose-loader?p2' },
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new UglifyJSPlugin()
  ]
};

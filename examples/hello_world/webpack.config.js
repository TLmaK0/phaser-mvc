const path = require('path');
const phaserModuleRelativePath = '/node_modules/phaser-ce/';
const phaserModulePath = path.join(__dirname, phaserModuleRelativePath);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

module.exports = {
  externals: {
    'phaser-ce': 'phaser-ce'
  },
  entry: path.resolve(__dirname, 'src/app.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.min.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Demo game'
    }),
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
    }),
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      server: {
        baseDir: ['./dist']
      }
    })
  ]
};

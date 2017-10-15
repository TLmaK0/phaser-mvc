var webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ["mocha"],
    files: [
      "test/*.ts",
      "test/**/*.ts"
    ],
    preprocessors: {
        "src/*.ts": ["webpack", "sourcemap"],
        "src/**/*.ts": ["webpack", "sourcemap"],
        "test/*.ts": ["webpack", "sourcemap"],
        "test/**/*.ts": ["webpack", "sourcemap"]
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    reporters: ["progress"],
    webpack: {
      devtool: 'inline-source-map',
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    webpackMiddleware: {
    },
    browsers: ["PhantomJS"]
  });
};

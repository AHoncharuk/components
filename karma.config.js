import webpackConfig from './webpack.config'

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'tests.source.js'
    ],
    preprocessors: {
      'tests.source.js': ['webpack', 'sourcemap', 'babel']
    },
    reporters: ['mocha', 'coverage'],
    webpackServer: {
      noInfo: true
    },
    plugins: [
      'karma-coverage',
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-mocha-reporter',
      'karma-babel-preprocessor'
    ],
    webpack: webpackConfig,
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    coverageReporter: {
      reporters: [
        {
          type: 'lcov',
          dir: 'coverage',
          subdir: '.'
        },
        {
          type: 'text-summary',
          dir: 'coverage',
          subdir: '.'
        }
      ]
    }
  })
}

import { dirs, getComponentsFiles, isDev, lists } from './utils/utils'
import errorHandler from 'gulp-plumber-error-handler'
import gulp from 'gulp'
import makeWebpackConfig from '../webpack.config.js'
import plumber from 'gulp-plumber'
// import statsLogger from 'webpack-stats-logger'
import webpackStream from 'webpack-stream'

// const webpack = webpackStream.webpack
const { NOTIFY } = process.env

// Файлы компилируемых компонентов
// const blocks = getComponentsFiles()
//
// // Вывод в консоль информации о взятых в сборку файлах
// if (blocks.js.length) {
//   console.log('---------- В сборку и обработку взяты JS-файлы (указана последовательность):')
//   console.log(blocks.js)
// }

gulp.task('scripts', (callback) => {

  let firstBuildReady = false
  function done(err) { // stats
    firstBuildReady = true

    if (err) {
      return
    }

    //  gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
    //    colors: true
    //  }))
  }

  const webpackConfig = makeWebpackConfig({
    watch: false,
    sourcemaps: isDev,
    notify: NOTIFY
  })

// if(lists.js.length > 0) {
  return gulp
    .src('src/js/global-script.js')
    .pipe(plumber({
      errorHandler: errorHandler('Error in "scripts" task')
    }))
    .pipe(webpackStream(webpackConfig, null, done))
    .pipe(gulp.dest(`${dirs.buildPatch}/js`))
    .on('data', () => {
      if (firstBuildReady) {
        callback()
      }
    })
// }

})

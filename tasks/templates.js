import cached from 'gulp-cached'
import { dirs } from './utils/utils'
import errorHandler from 'gulp-plumber-error-handler'
import filter from 'gulp-filter'
import getData from 'jade-get-data'
import gulp from 'gulp'
import gulpIf from 'gulp-if'
import inheritance from 'gulp-jade-inheritance'
import plumber from 'gulp-plumber'
import prettify from 'gulp-jsbeautifier'
import pug from 'gulp-pug'
import pugLint from 'gulp-pug-lint'
import rename from 'gulp-rename'

const data = {
  getData: getData('src/data'),
  jv0: 'javascript:void(0);',
  timestamp: Date.now()
}

// Сборка PUG
gulp.task('pug', () => {
  console.log('---------- сборка PUG')
  return gulp.src(`${dirs.srcPath}/**/*.pug`)
    .pipe(pugLint())
    .pipe(plumber({
      errorHandler: errorHandler('Error in "templates" task')
    }))
    .pipe(cached('pug'))
    // .pipe(gulpIf(global.watch, inheritance({
    //   basedir: 'src'
    // }
    // )))
    .pipe(filter((file) => /src[\\\/]pages/.test(file.path)))
    .pipe(pug({
      basedir: 'src',
      data
    }))
    .pipe(gulpIf(process.env.PRETTIFY !== false, prettify({
      braceStyle: 'expand',
      indentWithTabs: true,
      indentInnerHtml: true,
      preserveNewlines: true,
      endWithNewline: true,
      wrapLineLength: 120,
      maxPreserveNewlines: 50,
      wrapAttributesIndentSize: 1,
      unformatted: ['use']
    })))
    .pipe(rename({
      dirname: '.'
    }))
    .pipe(gulp.dest(dirs.buildPath))
})

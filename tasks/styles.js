import { browserSync, dirs, isDev, lists } from './utils/utils'
import autoprefixer from 'autoprefixer'
import cleanss from 'gulp-cleancss'
import debug from 'gulp-debug'
import fs from 'fs'
import gulp from 'gulp'
import gulpIf from 'gulp-if'
import mqpacker from 'css-mqpacker'
import notify from 'gulp-notify'
import postcss from 'gulp-postcss'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import size from 'gulp-size'
import sourcemaps from 'gulp-sourcemaps'
import wait from 'gulp-wait'
const atImport = require("postcss-import")
const inlineSVG = require('postcss-inline-svg')
import plumber from 'gulp-plumber'
import projectConfig from '../project.config.json'

// Запишем стилевой файл диспетчер подключений
let styleImports = '/**\n * ВНИМАНИЕ! Этот файл генерируется автоматически.\n * Не пишите сюда ничего вручную, все такие правки будут потеряны.\n * Читайте ./README.md для понимания.\n */\n\n';
lists.css.forEach(function(blockPath) {
  styleImports += '@import \''+blockPath+'\';\n';
});
fs.writeFileSync(dirs.srcPath + 'scss/style.scss', styleImports);


// Плагины postCSS, которыми обрабатываются все стилевые файлы
let postCssPlugins = [
  autoprefixer({browsers: ['last 2 version']}),
  mqpacker({
    sort: true
  }),
  atImport(),
  inlineSVG()
];

// // Вывод в консоль информации о взятых в сборку файлах
// if (blocks.additionalCss.length) {
//   console.log('---------- В сборку скопированы добавочные CSS:')
//   console.log(blocks.additionalCss)
// }

// Компиляция Sass
gulp.task('style', () => {
  console.log('---------- Компиляция Style')
  return gulp.src(`${dirs.srcPath}/scss/style.scss`)
   .pipe(plumber({
      errorHandler: function(err) {
        notify.onError({
          title: 'Styles compilation error',
          message: err.message
        })(err);
        this.emit('end');
      }
    }))
    .pipe(wait(100))
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(debug({
      title: 'SCSS:'
    }))
    .pipe(sass())
    .pipe(postcss(postCssPlugins))
    .pipe(gulpIf(!isDev, cleanss()))
    .pipe(rename('style.min.css'))
    .pipe(debug({
      title: 'RENAME:'
    }))
    .pipe(gulpIf(isDev, sourcemaps.write('/')))
    .pipe(size({
      title: 'Размер',
      showFiles: true,
      showTotal: false
    }))
    .pipe(gulp.dest(`${dirs.buildPath}/css`))
    .pipe(browserSync.stream({match: '**/*.css'}))
})

gulp.task('style:single', function () {
  if(projectConfig.singleCompiled.length) {
    const sass = require('gulp-sass');
    const sourcemaps = require('gulp-sourcemaps');
    const wait = require('gulp-wait');
    console.log('---------- Компиляция добавочных стилей');
    return gulp.src(projectConfig.singleCompiled)
      .pipe(plumber({
        errorHandler: function(err) {
          notify.onError({
            title: 'Single style compilation error',
            message: err.message
          })(err);
          this.emit('end');
        }
      }))
      .pipe(wait(100))
      .pipe(gulpIf(isDev, sourcemaps.init()))
      .pipe(debug({title: "Single style:"}))
      .pipe(sass())
      .pipe(postcss(postCssPlugins))
      .pipe(gulpIf(!isDev, cleanss()))
      .pipe(gulpIf(isDev, sourcemaps.write('/')))
      .pipe(size({
        title: 'Размер',
        showFiles: true,
        showTotal: false,
      }))
      .pipe(gulp.dest(dirs.buildPath + '/css'))
      .pipe(browserSync.stream({match: '**/*.css'}));
  }
})

// Копирование добавочных CSS, которые хочется иметь отдельными файлами
gulp.task('copy:css', function(callback) {
  if(projectConfig.copiedCss.length) {
    return gulp.src(projectConfig.copiedCss)
      .pipe(postcss(postCssPlugins))
      .pipe(cleanss())
      .pipe(size({
        title: 'Размер',
        showFiles: true,
        showTotal: false,
      }))
      .pipe(gulp.dest(dirs.buildPath + '/css'))
      .pipe(browserSync.stream());
  }
  else {
    callback();
  }
})

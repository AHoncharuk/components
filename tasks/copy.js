import { browserSync, dirs, isDev, lists } from './utils/utils'
import autoprefixer from 'autoprefixer'
import cleanss from 'gulp-cleancss'
import gulp from 'gulp'
import mqpacker from 'css-mqpacker'
import postcss from 'gulp-postcss'
import size from 'gulp-size'
const atImport = require("postcss-import")
const inlineSVG = require('postcss-inline-svg')
import newer from 'gulp-newer'
import pjson from '../package.json'

// Плагины postCSS, которыми обрабатываются все стилевые файлы
let postCssPlugins = [
  autoprefixer({
    browsers: ['last 2 version']
  }),
  mqpacker({
    sort: true
  }),
  atImport(),
  inlineSVG()
]

// Копирование добавочных CSS, которые хочется иметь отдельными файлами
gulp.task('copy:css', function(callback) {
  if(pjson.configProject.copiedCss.length) {
    return gulp.src(pjson.configProject.copiedCss)
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
});

// Копирование изображений
gulp.task('copy:img', function () {
  console.log('---------- Копирование изображений');
  return gulp.src(lists.img)
    .pipe(newer(dirs.buildPath + '/img'))  // оставить в потоке только изменившиеся файлы
    .pipe(size({
      title: 'Размер',
      showFiles: true,
      showTotal: false,
    }))
    .pipe(gulp.dest(dirs.buildPath + '/img'));
});

// Копирование JS
gulp.task('copy:js', function (callback) {
  if(pjson.configProject.copiedJs.length) {
    return gulp.src(pjson.configProject.copiedJs)
      .pipe(size({
        title: 'Размер',
        showFiles: true,
        showTotal: false,
      }))
      .pipe(gulp.dest(dirs.buildPath + '/js'));
  }
  else {
    callback();
  }
});

// Копирование шрифтов
gulp.task('copy:fonts', function () {
  console.log('---------- Копирование шрифтов');
  return gulp.src(dirs.srcPath + '/fonts/*.{ttf,woff,woff2,eot,svg}')
    .pipe(newer(dirs.buildPath + '/fonts'))  // оставить в потоке только изменившиеся файлы
    .pipe(size({
      title: 'Размер',
      showFiles: true,
      showTotal: false,
    }))
    .pipe(gulp.dest(dirs.buildPath + '/fonts'));
});

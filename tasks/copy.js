import { browserSync, dirs, lists } from './utils/utils'
import atImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import cleanss from 'gulp-cleancss'
import gulp from 'gulp'
import inlineSVG from 'postcss-inline-svg'
import mqpacker from 'css-mqpacker'
import postcss from 'gulp-postcss'
import size from 'gulp-size'
import newer from 'gulp-newer'
import projectConfig from '../project.config.json'

// Плагины postCSS, которыми обрабатываются все стилевые файлы
const postCssPlugins = [
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
gulp.task('copy:css', (callback) => {
  if (projectConfig.copiedCss.length) {
    return gulp.src(projectConfig.copiedCss)
      .pipe(postcss(postCssPlugins))
      .pipe(cleanss())
      .pipe(size({
        title: 'Размер',
        showFiles: true,
        showTotal: false
      }))
      .pipe(gulp.dest(`${dirs.buildPath}/css`))
      .pipe(browserSync.stream())
  } else {
    callback()
  }
})

// Копирование изображений
gulp.task('copy:img', () => {
  console.log('---------- Копирование изображений')
  return gulp.src(lists.img)
    .pipe(newer(`${dirs.buildPath}/img`))
    .pipe(size({
      title: 'Размер',
      showFiles: true,
      showTotal: false
    }))
    .pipe(gulp.dest(`${dirs.buildPath}/img`))
})

// Копирование шрифтов
gulp.task('copy:fonts', () => {
  console.log('---------- Копирование шрифтов')
  return gulp.src(`${dirs.srcPath}/fonts/*.{ttf,woff,woff2,eot,svg}`)
    .pipe(newer(`${dirs.buildPath}/fonts`))  // оставить в потоке только изменившиеся файлы
    .pipe(size({
      title: 'Размер',
      showFiles: true,
      showTotal: false
    }))
    .pipe(gulp.dest(`${dirs.buildPath}/fonts`))
})

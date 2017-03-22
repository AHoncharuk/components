import { dirs } from './utils/utils'
import gulp from 'gulp'
import newer from 'gulp-newer'
import size from 'gulp-size'

// Копирование шрифтов
gulp.task('fonts:copy', () => {
  console.log('---------- Копирование шрифтов')
  return gulp.src(`${dirs.source}/fonts/*.{ttf,woff,woff2,eot,svg}`, {
    since: gulp.lastRun('fonts:copy')
  })
  .pipe(newer(`${dirs.build}/fonts`))  // оставить в потоке только изменившиеся файлы
  .pipe(size({
    title: 'Размер',
    showFiles: true,
    showTotal: false
  }))
  .pipe(gulp.dest(`${dirs.build}/fonts`))
})

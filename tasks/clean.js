import del from 'del'
import { dirs } from './utils/utils'
import gulp from 'gulp'

// Очистка папки сборки
gulp.task('clean', () => {
  console.log('---------- Очистка папки сборки')
  return del([
    `${dirs.buildPath}/**/*`,
    `!${dirs.buildPath}/readme.md`
  ])
})

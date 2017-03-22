import { dirs } from './utils/utils'
import ghPages from 'gulp-gh-pages'
import gulp from 'gulp'

// Отправка в GH pages (ветку gh-pages репозитория)
gulp.task('deploy', () => {
  console.log('---------- Публикация ./build/ на GH pages')
  // console.log('---------- '+ ghPagesUrl);
  return gulp.src(dirs.buildPath + '**/*')
    .pipe(ghPages())
})

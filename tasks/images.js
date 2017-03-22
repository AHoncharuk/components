import { dirs, getComponentsFiles } from './utils/utils'
import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import newer from 'gulp-newer'
import pngquant from 'imagemin-pngquant'

// Оптимизация изображений // folder=src/img/icons/ npm start img:opt
const folder = process.env.folder
gulp.task('img:opt', (callback) => {
  if (folder) {
    console.log('---------- Оптимизация картинок')
    return gulp.src(`${folder}/*.{jpg,jpeg,gif,png,svg}`)
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        use: [pngquant()]
      }))
      .pipe(gulp.dest(folder))
  } else {
    console.log('---------- Оптимизация картинок: ошибка (не указана папка)')
    console.log('---------- Пример вызова команды: folder=src/blocks/block-name/img_to_bg/ npm start img:opt')
    callback()
  }
})

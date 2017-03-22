import { browserSync, dirs, getComponentsFiles, port, reload, lists } from './utils/utils'
import gulp from 'gulp'
import pjson from '../package.json'

// Локальный сервер, слежение
gulp.task('serve', ['build'], () => {
  browserSync.init({
    server: dirs.buildPath,
    port:8080,
    open: false,
    startPath: 'index.html'
  })
  gulp.watch([
      dirs.srcPath + 'scss/style.scss',
      dirs.srcPath + dirs.blocksDirName + '/**/*.scss',
      pjson.configProject.addCssBefore,
      pjson.configProject.addCssAfter
    ], ['style'])

// Слежение за отдельными стилями
  gulp.watch(pjson.configProject.singleCompiled, ['style:single']);
  // Слежение за добавочными стилями
  if(pjson.configProject.copiedCss.length) {
    gulp.watch(pjson.configProject.copiedCss, ['copy:css']);
  }

  // Слежение за изображениями
   if(lists.img.length) {
     gulp.watch(lists.img, ['watch:img']);
   }
   // Слежение за добавочными JS
   if(pjson.configProject.copiedJs.length) {
     gulp.watch(pjson.configProject.copiedJs, ['watch:copied:js']);
   }
   // Слежение за шрифтами
   gulp.watch('/fonts/*.{ttf,woff,woff2,eot,svg}', {cwd: dirs.srcPath}, ['watch:fonts']);

//слежение за pug
  gulp.watch([
    `${dirs.blocksDirName}/**/*.pug`,
    `${dirs.blocksDirName}/blocks/**/*.pug`
  ], {cwd: dirs.srcPath}, ['watch:pug'])

  // // Слежение за JS
  // if(lists.js.length) {
  //   gulp.watch(lists.js, ['watch:js']);
  // }
  // Слежение за SVG (спрайты)
  if((pjson.configProject.blocks['sprite-svg']) !== undefined) {
    gulp.watch('*.svg', {cwd: spriteSvgPath}, ['watch:sprite:svg']); // следит за новыми и удаляемыми файлами
  }
  // Слежение за PNG (спрайты)
  if((pjson.configProject.blocks['sprite-png']) !== undefined) {
    gulp.watch('*.png', {cwd: spritePngPath}, ['watch:sprite:png']); // следит за новыми и удаляемыми файлами
  }

})

gulp.task('watch:img', ['copy:img'], reload);
gulp.task('watch:copied:js', ['copy:js'], reload);
gulp.task('watch:fonts', ['copy:fonts'], reload);
gulp.task('watch:pug', ['html'], reload);
// gulp.task('watch:js', ['js'], reload);
gulp.task('watch:sprite:svg', ['sprite:svg'], reload);
gulp.task('watch:sprite:png', ['sprite:png'], reload);


// Задача по умолчанию
gulp.task('default', ['serve']);

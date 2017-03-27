import { browserSync, dirs, port, lists } from './utils/utils'
import gulp from 'gulp'
import projectConfig from '../project.config.json'
import debuga from 'debuga'

const { PORT, OPEN, NODE_ENV, TUNNEL } = process.env

// Локальный сервер, слежение
gulp.task('serve', ['build'], () => {
  browserSync.init({
    files: `${dirs.buildPath}/**/*`,
    port: PORT || 3000,
    open: !!OPEN,
    reloadOnRestart: true,
    server: {
      baseDir: [
        dirs.buildPath,
        'src'
      ],
      directory: false,
      middleware: NODE_ENV !== 'production' ? [debuga()] : []
    },
    tunnel: !!TUNNEL,
    startPath: 'index.html'
  })
  gulp.watch([
      dirs.srcPath + 'scss/style.scss',
      dirs.srcPath + dirs.blocksDirName + '/**/*.scss',
      projectConfig.addCssBefore,
      projectConfig.addCssAfter
    ], ['style'])

// Слежение за отдельными стилями
  gulp.watch(projectConfig.singleCompiled, ['style:single']);
  // Слежение за добавочными стилями
  if(projectConfig.copiedCss.length) {
    gulp.watch(projectConfig.copiedCss, ['copy:css']);
  }

console.log('img', lists.img.length)
  // Слежение за изображениями
   if(lists.img.length) {
     gulp.watch(lists.img, ['watch:img']);
    //  gulp.watch(lists.img, {cwd: dirs.srcPath}, ['watch:img']);

   }
   // Слежение за добавочными JS
   if(projectConfig.copiedJs.length) {
     gulp.watch(projectConfig.copiedJs, ['watch:copied:js']);
   }
   // Слежение за шрифтами
   gulp.watch('/fonts/*.{ttf,woff,woff2,eot,svg}', {cwd: dirs.srcPath}, ['watch:fonts']);

//слежение за js
gulp.start('scripts:watch');

console.log('blocks', dirs.srcPath, dirs.blocksDirName);
//слежение за pug
  gulp.watch([
    `**/**/*.pug`,
    `**/*.pug`
  ], {cwd: dirs.srcPath }, ['watch:pug'])


  // Слежение за SVG (спрайты)
  let spriteSvgPath = dirs.srcPath + dirs.blocksDirName + '/sprite-svg/svg/';
  if((projectConfig.blocks['sprite-svg']) !== undefined) {
    gulp.watch('*.svg', {cwd: spriteSvgPath}, ['watch:sprite:svg']); // следит за новыми и удаляемыми файлами
  }
  // Слежение за PNG (спрайты)
  let spritePngPath = dirs.srcPath + dirs.blocksDirName + '/sprite-png/png/';
  if((projectConfig.blocks['sprite-png']) !== undefined) {
    gulp.watch('*.png', {cwd: spritePngPath}, ['watch:sprite:png']); // следит за новыми и удаляемыми файлами
  }

})

gulp.task('watch:img', ['copy:img'], reload);
gulp.task('watch:copied:js', ['copy:js'], reload);
gulp.task('watch:fonts', ['copy:fonts'], reload);
gulp.task('watch:pug', ['pug'], reload);
// gulp.task('watch:js', ['js'], reload);
gulp.task('watch:sprite:svg', ['sprite:svg'], reload);
gulp.task('watch:sprite:png', ['sprite:png'], reload);


// Задача по умолчанию
gulp.task('default', ['serve']);

function reload(done) {
  browserSync.reload()
  done()
}

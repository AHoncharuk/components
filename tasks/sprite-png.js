import { dirs, fileExist } from './utils/utils'
import gulp from 'gulp'
import rename from 'gulp-rename'
import size from 'gulp-size'
import spritesmith from 'gulp.spritesmith'
import buffer from 'vinyl-buffer'
import merge from 'merge-stream'
import imagemin from 'gulp-imagemin'
import pngquant from 'imagemin-pngquant'
import projectConfig from '../project.config.json'
import del from 'del'

// Сборка SVG-спрайта для блока sprite-png
const spritePngPath =  `${dirs.srcPath}${dirs.blocksDirName}/sprite-png/png/`
gulp.task('sprite:png', (callback) => {
  if (projectConfig.blocks['sprite-png'] !== undefined) {
    if (fileExist(spritePngPath) !== false) {
      del(`${dirs.srcPath}${dirs.blocksDirName}/sprite-png/img/*.png`)
      const fileName = `sprite-${Math.random().toString().replace(/[^0-9]/g, '')}.png`
      const spriteData = gulp.src(`${spritePngPath}*.png`)
        .pipe(spritesmith({
          imgName: fileName,
          cssName: 'sprite-png.scss',
          padding: 4,
          imgPath: `../img/${fileName}`
        }))
      const imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin({
          use: [pngquant()]
        }))
        .pipe(gulp.dest(`${dirs.srcPath}${dirs.blocksDirName}/sprite-png/img/`))
      const cssStream = spriteData.css
        .pipe(gulp.dest(`${dirs.srcPath}${dirs.blocksDirName}/sprite-png/`))
      return merge(imgStream, cssStream)
    } else {
      console.log('---------- Сборка PNG спрайта: ОТМЕНА, нет папки с картинками')
      callback()
    }
  } else {
    console.log('---------- Сборка PNG спрайта: ОТМЕНА, блок не используется на проекте')
    callback()
  }
})

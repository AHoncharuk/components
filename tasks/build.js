import clean from './clean.js'
import deploy from './deploy.js'
import fonts from './fonts.js'
import gulp from 'gulp'
import images from './images.js'
import styles from './styles.js'
import scripts from './scripts.js'
import templates from './templates.js'
import spriteSvg from './sprite-svg'
import spritePng from './sprite-png'
import copy from './copy'

// Сборка всего
gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('sprite:svg', 'sprite:png', 'style', 'style:single', 'scripts', 'copy:css', 'copy:img', 'copy:js', 'copy:fonts'),
  'pug'
))

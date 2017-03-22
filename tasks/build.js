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
const gulpSequence = require('gulp-sequence')

// Сборка всего
gulp.task('build', function (callback) {
  gulpSequence(
    'clean',
    ['sprite:svg', 'sprite:png'],
    ['style', 'style:single', 'scripts', 'copy:css', 'copy:img', 'copy:js', 'copy:fonts'],
    'pug',
    callback
  );
});

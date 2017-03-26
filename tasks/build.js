import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'

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

const gulp = require('gulp');

gulp.task('copy-executables', (cb) => {
    gulp.src('./executables/*/**')
        .pipe(gulp.dest('./dist/executables'))
    cb();
});
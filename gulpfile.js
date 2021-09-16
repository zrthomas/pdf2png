const gulp = require('gulp');

gulp.task('copy-executables', (cb) => {
    gulp.src('./src/executables/*/**')
        .pipe(gulp.dest('./dist/executables'))
    cb();
});
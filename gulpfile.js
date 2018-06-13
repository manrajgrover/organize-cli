const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('es6', () => {
  gulp.src('src/*.js')
    .pipe(babel({
      presets: ['env'],
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
  gulp.watch(['./src/*.js'], ['es6']);
});

gulp.task('default', ['es6']);

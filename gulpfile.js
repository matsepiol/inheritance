var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('scss/style.scss')
    .pipe(sass()) 
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

/*gulp.task('js', function() {
  return gulp.src('js/main.js')
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
      stream: true
    }))
});*/

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('scss/style.scss', ['sass']);
  //gulp.watch('js/*', ['js']);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    browser: ["firefox"]
  })
});

gulp.task('default', ['watch']);
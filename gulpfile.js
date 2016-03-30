var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src('scss/style.scss')
    .pipe(sass()) 
    .pipe(gulp.dest('scss'))
    .pipe(autoprefixer())
    .pipe(gulp.dest('autoprefix'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('autoprefix', function() {
  return gulp.src('scss/style.scss')
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 8', 'ie 9']
    }))
    .pipe(gulp.dest('./'))
});

gulp.task('js', function() {
  return gulp.src('js/main.js')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('scss/style.scss', ['sass']);
  gulp.watch('js/*', ['js']);
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
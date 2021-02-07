/* eslint-disable no-multi-spaces */
/* eslint-disable comma-dangle */
const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const sourcemap = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

function clean() {
  return del('./css/**', { force: true });
}

function styles() {
  return gulp
    .src('scss/fxgrid.scss')
    .pipe(sourcemap.init())
    .pipe(
      sass({
        includePaths: ['./node_modules'],
        outputStyle: 'expanded',
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest('./css'))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('./css'));
}

function watch() {
  gulp.watch(['scss/fxgrid.scss'], gulp.series(clean, styles));
}

gulp.task('build', gulp.series(clean, styles));
gulp.task('watch', watch);

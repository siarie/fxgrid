const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');

// Load Gulp Plugins
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

const pkg = require('./package.json');

gulp.task('clean:dist', () => del('./dist/**', { force: true }));
gulp.task('clean:docs', () => del('./docs/**', { force: true }));

gulp.task('style', () => {
  // eslint-disable-next-line global-require
  const postcssPlugins = [autoprefixer(), cssnano()];
  return gulp
    .src('src/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(rename({ basename: pkg.name }))
    .pipe(gulp.dest('./dist'))
    .pipe(postcss(postcssPlugins))
    .pipe(rename({ basename: pkg.name, suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('makedocs', () => {
  // eslint-disable-next-line global-require
  const postcssPlugins = [autoprefixer(), cssnano()];
  return gulp
    .src('src/docs/docs.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(rename({ basename: 'docs', suffix: '.min' }))
    .pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./docs'));
});

gulp.task('copy', () => {
  const listFile = [
    './src/docs/index.html',
    './src/docs/favicon.ico',
    './dist/fxgrid.min.*',
  ];
  return gulp.src(listFile).pipe(gulp.dest('./docs'));
});

gulp.task('default', gulp.series(['clean:dist', 'style']));
gulp.task('docs', gulp.series(['clean:docs', 'makedocs', 'copy']));

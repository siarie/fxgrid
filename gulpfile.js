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

gulp.task('clean', () => del('./dist/**', { force: true }));

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

gulp.task('docs', () => {
  // eslint-disable-next-line global-require
  const postcssPlugins = [autoprefixer(), cssnano()];
  return gulp
    .src('src/docs/docs.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(rename({ basename: 'docs', suffix: '.min' }))
    .pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./docs'))
    .pipe(
      gulp
        .src(['./src/docs/index.html', './src/docs/favicon.ico'])
        .pipe(gulp.dest('./docs')),
    );
});

gulp.task('default', gulp.series(['clean', 'style']));
// gulp.task('docs', gulp.series());

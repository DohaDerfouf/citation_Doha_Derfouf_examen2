gulp.task('build', gulp.parallel('minify-css', 'minify-js'));
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const gulp = require('gulp');

gulp.task('minify-css', () => {
  return gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      tailwindcss('./tailwind.config.js'),
      autoprefixer(),
      cssnano()
    ]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-js', () => {
  return gulp.src(['src/js/**/*.js', '!src/js/**/*.min.js'])
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('default', gulp.parallel('minify-css', 'minify-js'));

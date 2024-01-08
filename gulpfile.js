const gulp = require('gulp');
const minifyCSS = require('gulp-clean-css');
const minifyJS = require('gulp-uglify');
const replace = require('gulp-replace');
// Tâche pour minifier les fichiers CSS et les placer dans /dist
gulp.task('minify-css', () => {
  return gulp.src('src/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'));
});

// Tâche pour minifier les fichiers JS et les placer dans /dist
gulp.task('minify-js', () => {
  return gulp.src('src/js/*.js')
    .pipe(minifyJS())
    .pipe(gulp.dest('dist/js'));
});

// Tâche pour remplacer les liens vers les fichiers minifiés dans les fichiers HTML
gulp.task('replace-html', () => {
  return gulp.src('src/*.html')
    .pipe(replace('.css', '.min.css'))
    .pipe(replace('.js', '.min.js'))
    .pipe(gulp.dest('dist'));
});

// Tâche pour exécuter toutes les tâches de minification et de remplacement
gulp.task('minify-all', gulp.series('minify-css', 'minify-js', 'replace-html'));

// Tâche par défaut - exécute toutes les tâches de minification et de remplacement
gulp.task('default', gulp.series('minify-all'));

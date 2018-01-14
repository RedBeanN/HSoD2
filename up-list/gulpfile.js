let gulp = require('gulp'),
    gutil = require('gulp-util'),
    babel = require('gulp-babel'),
    imports = require('gulp-imports'),
    uglify = require('gulp-uglify-es').default,
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css');

gulp.task('minifyjs', () => {
  return gulp.src(['public/javascripts/*', '!public/javascripts/*.min.js'])
        .pipe(imports())
        // .pipe(babel({presets: ['es2015']}))
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/dist/js'));
});

gulp.task('minifycss', () => {
  return gulp.src('public/stylesheets/*.css')
         .pipe(rename({suffix: '.min'}))
         .pipe(minifycss())
         .pipe(gulp.dest('public/dist/css'));
});

gulp.task('default', () => {
  gulp.start('minifycss', 'minifyjs');
});
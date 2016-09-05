'use strict';

var gulp = require('gulp'),
	clean = require('gulp-clean'),
	concatCss = require('gulp-concat-css'),
	cleanCSS = require('gulp-clean-css'),
	concatjs = require('gulp-concat'),
	jsmin = require('gulp-jsmin'),
	inject = require('gulp-inject');


// Clean folder
gulp.task('clean', function () {
   return gulp.src('dist')
    .pipe(gulp.dest('dist'));
});

// Contat and minify css
gulp.task('css', function () {
  return gulp.src('css/*.css')
    .pipe(concatCss("styles.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

// Concat and minify js
gulp.task('js', function() {
  return gulp.src('js/*.js')
    .pipe(concatjs('scripts.js'))
    //.pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'));
});

// Copy
gulp.task('copy', function() {
   return gulp.src('img/**')
   	.pipe(gulp.dest('dist/img'))
   	.pipe(gulp.src('parts/**'))
   	.pipe(gulp.dest('dist/parts'))
   	.pipe(gulp.src('languages/**'))
   	.pipe(gulp.dest('dist/languages'))
	.pipe(gulp.src('images/**'))
   	.pipe(gulp.dest('dist/images'))
   	.pipe(gulp.src('add.php'))
   	.pipe(gulp.dest('dist'))
   	.pipe(gulp.src('database'))
   	.pipe(gulp.dest('dist'))
   	.pipe(gulp.src('index.php'))
   	.pipe(gulp.dest('dist'))
   	.pipe(gulp.src('gallery.php'))
   	.pipe(gulp.dest('dist'))
});

// Inject new css and js linls
gulp.task('inject', function () {
  var target = gulp.src('dist/index.php');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['dist/css/styles.css', 'dist/js/scripts.js'], {read: false});
 console.log("test");
  return target.pipe(inject(sources))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean', 'css', 'js', 'copy-inject'], function() {
  console.log('Compiled');
});

gulp.task('fast', ['clean', 'copy', 'inject'], function() {
  console.log('Compiled');
});


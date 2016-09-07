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
   return gulp.src('dist', {read:false})
    .pipe(clean());
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

    .pipe(gulp.dest('dist/js'));
});

// Copy
gulp.task('copy', function() {
   return gulp.src([
	   		'img/**', 
	   		'images/**', 
	   		'partials/**', 
	   		'languages/**', 
	   		'js/**', 
	   		'add.php', 
	   		'index.php', 
	   		'gallery.php'
   		], { base: './' })
   	.pipe(gulp.dest('dist'))
});

// Inject new css
gulp.task('inject-css', function () {
  var target = gulp.src('./dist/partials/header.php');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./dist/css/styles.css'], {read: false});

  return target.pipe(inject(sources), {relative: true})
    .pipe(gulp.dest('./dist/partials'));
});

// Inject new js
gulp.task('inject-js', function () {
  var target = gulp.src('dist/partials/script.php');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['dist/js/scripts.js'], {read: false});

  return target.pipe(inject(sources), {relative: true})
    .pipe(gulp.dest('./dist/partials'));
});

gulp.task('default', ['clean', 'css', 'copy'], function() {
  console.log('Compiled');
});

gulp.task('fast', ['clean', 'copy', 'inject'], function() {
  console.log('Compiled');
});

gulp.task('inject', ['inject-css'], function() { console.log('Injected'); });


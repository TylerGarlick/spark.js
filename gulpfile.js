"use strict";

var gulp = require('gulp'),
  traceur = require('gulp-traceur'),
  clean = require('gulp-clean');

var paths = {
  src: 'src/*.js',
  dest: 'dist'

};

gulp.task('clean-scripts', function () {
  return gulp.src(paths.dest, { read: false })
    .pipe(clean())
});

gulp.task('transpile', [ 'clean-scripts' ], function () {
  return gulp.src(paths.src)
    .pipe(traceur( { modules: 'instantiate' }))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('default', [ 'transpile' ]);
/*jshint globalstrict: true*/
/*global require*/

'use strict';

const gulp = require('gulp')
const util = require('util')
const jdists = require('gulp-jdists')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const examplejs = require('gulp-examplejs')
const typescript = require('gulp-typescript')
const merge2 = require('merge2')

gulp.task('build', function () {
  var tsResult = gulp.src('./src/ts/*.ts')
    .pipe(jdists())
    .pipe(gulp.dest('./'))
    .pipe(typescript({
      target: 'ES5',
      declaration: true,
    }))

  return merge2([
    tsResult.dts.pipe(gulp.dest('./')),
    tsResult.js.pipe(gulp.dest('./'))
  ]);
})

gulp.task('jdists', ['build'], function () {
  gulp.src('./src/iplus.jdists.js')
    .pipe(jdists())
    .pipe(rename('iplus.js'))
    .pipe(gulp.dest('./'))
})

gulp.task('uglify', function () {
  gulp.src('iplus.js')
    .pipe(uglify())
    .pipe(rename('iplus.min.js'))
    .pipe(gulp.dest('./'))
})

gulp.task('example', function () {
  return gulp.src([
    'src/ts/*.ts'
  ])
    .pipe(examplejs({
      header: `
global.iplus = require('../iplus.js');
      `
    }))
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest('test'))
})

gulp.task('dist', ['jdists', 'uglify'])
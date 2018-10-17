/*jshint globalstrict: true*/
/*global require*/

'use strict'

const gulp = require('gulp')
const jdists = require('gulp-jdists')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const examplejs = require('gulp-examplejs')
const typescript = require('gulp-typescript')
const replace = require('gulp-replace')
const merge2 = require('merge2')
const packageInfo = require('./package')

function taskBuild() {
  var tsResult = gulp
    .src('src/*.ts')
    .pipe(jdists())
    .pipe(gulp.dest('lib'))
    .pipe(
      typescript({
        target: 'ES5',
        declaration: true,
        module: 'umd',
      })
    )

  return merge2([
    tsResult.dts.pipe(gulp.dest('lib')),
    tsResult.js
      .pipe(
        replace(
          /(\(function\s*\()(factory\)\s*\{)/,
          '$1root, $2\n    /* istanbul ignore next */'
        )
      )
      .pipe(
        replace(
          /(define\(\["require",\s*"exports"\],\s*factory\);\s*\})/,
          '$1 else { factory(null, root["' + packageInfo.name + '"] = {}); }'
        )
      )
      .pipe(
        replace(
          /(\s*\}\s*\)\s*\()(function\s*\(require,\s*exports\)\s*\{)/,
          '$1this, $2'
        )
      )
      .pipe(gulp.dest('lib')),
  ])
}

function taskUglify() {
  return gulp
    .src('lib/iplus.js')
    .pipe(uglify())
    .pipe(rename('iplus.min.js'))
    .pipe(gulp.dest('lib'))
}

function taskExample() {
  return gulp
    .src(['src/*.ts'])
    .pipe(
      examplejs({
        header: `
global.iplus = require('../')
      `,
      })
    )
    .pipe(
      rename({
        extname: '.js',
      })
    )
    .pipe(gulp.dest('test'))
}

gulp.task('dist', gulp.series(taskBuild, taskExample, taskUglify))
gulp.task('example', gulp.series(taskExample))

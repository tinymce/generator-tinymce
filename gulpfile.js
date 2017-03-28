'use strict'
const path = require('path')
const gulp = require('gulp')
const eslint = require('gulp-eslint')
const eslintConfig = require('./.eslintrc')
const excludeGitignore = require('gulp-exclude-gitignore')
const mocha = require('gulp-mocha')
const istanbul = require('gulp-istanbul')
const nsp = require('gulp-nsp')
const plumber = require('gulp-plumber')

gulp.task('static', function () {
  return gulp.src(['**/*.js', '!generators/**/templates/**/*.js'])
    .pipe(excludeGitignore())
    .pipe(eslint({ baseConfig: eslintConfig }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('nsp', function (cb) {
  nsp({package: path.resolve('package.json')}, cb)
})

gulp.task('pre-test', function () {
  return gulp.src(['generators/**/*.js', '!generators/**/templates/**/*.js'])
    .pipe(excludeGitignore())
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
})

gulp.task('test', ['pre-test'], function (cb) {
  var mochaErr

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function (err) {
      mochaErr = err
    })
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({thresholds: { global: 90 }}))
    .on('end', function () {
      cb(mochaErr)
    })
})

gulp.task('watch', function () {
  gulp.watch(['generators/**/*.js', 'test/**'], ['test'])
})

gulp.task('prepublish', ['nsp'])
gulp.task('default', ['static', 'test'])

// @ts-check
const path = require('path')
const gulp = require('gulp')
const mocha = require('gulp-mocha')
const plumber = require('gulp-plumber')
const ts = require('gulp-typescript')
const tslint = require('gulp-tslint').default;
const del = require('del');

const tsProject = ts.createProject('tsconfig.json')

gulp.task('ts', () => {
  return gulp.src('src/**/*.ts').pipe(tsProject()).js.pipe(gulp.dest('generators'))
})

gulp.task('templates', () => {
  return gulp.src(['src/package/templates/**/*', 'src/plugin/templates/**/*'], { base: 'src' }).pipe(gulp.dest('generators'))
})

gulp.task('tslint', function () {
  return gulp.src(['src/**/*.ts', '!generators/**/templates/**/*.ts'])
    .pipe(tslint({ formatter: 'prose' }))
    .pipe(tslint.report())
    // .pipe(eslint({ baseConfig: eslintConfig }))
    // .pipe(eslint.format())
    // .pipe(eslint.failAfterError())
})

gulp.task('cleanup', () => del(['generators']))

gulp.task('test', function (cb) {
  var mochaErr

  return gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({ reporter: 'spec' }))
    .on('error', function (err) {
      mochaErr = err
    })
    .on('end', function () {
      cb(mochaErr)
    })
})

gulp.task('watch', function () {
  gulp.watch(['src/**/*.ts', 'src/**/templates/**/*', 'test/**'], gulp.series('ts', 'templates', 'test'))
})

gulp.task('default', gulp.series('cleanup', 'tslint', 'ts', 'templates', 'test'))

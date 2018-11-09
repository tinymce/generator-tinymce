// @ts-check
const path = require('path')
const gulp = require('gulp')
const excludeGitignore = require('gulp-exclude-gitignore')
const mocha = require('gulp-mocha')
const nsp = require('gulp-nsp')
const plumber = require('gulp-plumber')
const ts = require('gulp-typescript')

const tsProject = ts.createProject('tsconfig.json')

gulp.task('ts', () => {
  return gulp.src('src/**/*.ts').pipe(tsProject()).js.pipe(gulp.dest('generators'))
})

gulp.task('templates', () => {
  return gulp.src(['src/package/templates/**/*', 'src/plugin/templates/**/*'], { base: 'src' }).pipe(gulp.dest('generators'))
})

gulp.task('static', function () {
  return gulp.src(['**/*.js', '!generators/**/templates/**/*.js'])
    .pipe(excludeGitignore())
    // .pipe(eslint({ baseConfig: eslintConfig }))
    // .pipe(eslint.format())
    // .pipe(eslint.failAfterError())
})

gulp.task('nsp', function (cb) {
  nsp({ package: path.resolve('package.json') }, cb)
})

gulp.task('pre-test', function () {
  return gulp.src(['generators/**/*.js', '!generators/**/templates/**/*.js'])
    .pipe(excludeGitignore())
})

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

gulp.task('prepublish', gulp.series('nsp'))
gulp.task('default', gulp.series('ts', 'templates', 'static', 'test'))

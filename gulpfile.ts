import * as gulp from 'gulp';
import * as mocha from 'gulp-mocha';
import * as plumber from 'gulp-plumber';
import * as ts from 'gulp-typescript';
import tslint from 'gulp-tslint';
import * as del from 'del';

const tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', () => {
  return gulp.src('src/**/*.ts').pipe(tsProject()).js.pipe(gulp.dest('generators'));
});

gulp.task('templates', () => {
  return gulp.src(['src/package/templates/**/*', 'src/plugin/templates/**/*'], { base: 'src' }).pipe(gulp.dest('generators'));
});

gulp.task('tslint', function () {
  return gulp.src(['src/**/*.ts', '!generators/**/templates/**/*.ts'])
    .pipe(tslint({ formatter: 'prose' }))
    .pipe(tslint.report());
});

gulp.task('cleanup', () => del(['generators']));

gulp.task('test', function (cb) {
  let mochaErr;

  return gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({ reporter: 'spec' }))
    .on('error', function (err) {
      mochaErr = err;
    })
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.ts', 'src/**/templates/**/*', 'test/**'], gulp.series('ts', 'templates', 'test'));
});

gulp.task('default', gulp.series('cleanup', 'tslint', 'ts', 'templates', 'test'));

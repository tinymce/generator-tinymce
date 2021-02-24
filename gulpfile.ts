import * as gulp from 'gulp';
import * as mocha from 'gulp-mocha';
import * as plumber from 'gulp-plumber';
import * as ts from 'gulp-typescript';
import * as eslint from 'gulp-eslint';
import * as del from 'del';

const tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', () => {
  return gulp.src([ 'src/**/*.ts', '!src/**/templates/**/*.ts' ]).pipe(tsProject()).js.pipe(gulp.dest('generators'));
});

gulp.task('templates', () => {
  return gulp.src(['src/package/templates/**/*', 'src/plugin/templates/**/*'], { base: 'src' }).pipe(gulp.dest('generators'));
});

gulp.task('eslint', () => {
  return gulp.src([ 'src/**/*.ts', '!generators/**/templates/**/*.ts' ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('cleanup', () => del(['generators']));

gulp.task('test', (cb) => {
  let mochaErr;

  return gulp.src('test/**/*.ts')
    .pipe(plumber())
    .pipe(mocha({ reporter: 'spec', require: [ 'ts-node/register' ] }))
    .on('error', (err) => {
      mochaErr = err;
    })
    .on('end', () => {
      cb(mochaErr);
    });
});

gulp.task('watch', () => {
  gulp.watch(['src/**/*.ts', 'src/**/templates/**/*', 'test/**'], gulp.series('test'));
});

gulp.task('default', gulp.series('cleanup', 'eslint', 'ts', 'templates', 'test'));

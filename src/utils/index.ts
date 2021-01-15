import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as chalk from 'chalk';

export const handleDir = (ctx, name: string) => {
  if (path.basename(ctx.destinationPath()) !== name) {
    ctx.log(
      '\n' +
      chalk.green('!') + ' Your plugin must be inside a directory \n' +
      chalk.green('!') + ' with the same name as the plugin: ' + chalk.blue(name) + '\n' +
      chalk.green('!') + ' I\'ll automatically create this directory for you.\n'
    );
    mkdirp(name);
    ctx.destinationRoot(ctx.destinationPath(name));
  }
};

export const copyHelper = (ctx) =>
  (from: string, dest: string, opts?) => {
    opts = opts === undefined ? {} : opts;
    ctx.fs.copyTpl(
      ctx.templatePath(from),
      ctx.destinationPath(dest),
      opts
    );
  };

export const gitInit = (ctx, message: string = 'Initial commit.') => {
  ctx.spawnCommandSync('git', [ 'init', '--quiet' ]);
  ctx.spawnCommandSync('git', [ 'add', '--all' ]);
  ctx.spawnCommandSync('git', [ 'commit', '-m', message, '--quiet' ]);
  ctx.log(
    '\n' +
    chalk.green('success') + ' Created git repository!' +
    '\n'
  );
};

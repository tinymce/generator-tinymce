const path = require('path')
const mkdirp = require('mkdirp')
const chalk = require('chalk')
// const R = require('ramda')

const handleDir = ctx => {
  const {name} = ctx.props
  if (path.basename(ctx.destinationPath()) !== name) {
    ctx.log(
      '\n' +
      chalk.green('!') + ' Your plugin must be inside a directory \n' +
      chalk.green('!') + ' with the same name as the plugin: ' + chalk.blue(name) + '\n' +
      chalk.green('!') + ' I\'ll automatically create this directory for you.\n'
    )
    mkdirp(ctx.props.name)
    ctx.destinationRoot(ctx.destinationPath(ctx.props.name))
  }
}

const copyHelper = ctx =>
  (from, dest, opts = {}) => {
    ctx.fs.copyTpl(
          ctx.templatePath(from),
          ctx.destinationPath(dest),
          opts
        )
  }

const gitInit = (ctx, message = 'Initial commit.') => {
  ctx.spawnCommandSync('git', ['init', '--quiet'])
  ctx.spawnCommandSync('git', ['add', '--all'])
  ctx.spawnCommandSync('git', ['commit', '-m', message, '--quiet'])
  ctx.log(
    '\n' +
    chalk.green('success') + ' Created git repository!' +
    '\n'
    )
}

module.exports = {
  handleDir,
  copyHelper,
  gitInit
}

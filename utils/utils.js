const path = require('path')
const mkdirp = require('mkdirp')
// const R = require('ramda')

const handleDir = ctx => {
  if (path.basename(ctx.destinationPath()) !== ctx.props.name) {
    ctx.log(
      'Your plugin must be inside a directory with the same name as the plugin (' + ctx.props.name + ')\n' +
      'I\'ll automatically create this directory for you.'
    )
    mkdirp(ctx.props.name)
    ctx.destinationRoot(ctx.destinationPath(ctx.props.name))
  }
}

module.exports = {
  handleDir
}

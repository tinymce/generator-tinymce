'use strict'
const Generator = require('yeoman-generator')
const camelCase = require('lodash.camelcase')

module.exports = class ES2015 extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.option('name', {
      type: String,
      required: true,
      desc: 'Name of the plugin'
    })
  }

  initializing () {
    const {name} = this.options
    const camelName = camelCase(name)

    console.log('name', name)

    const copyHelper = (from, dest, opts = {}) => {
      this.fs.copyTpl(
        this.templatePath(from),
        this.destinationPath(dest),
        opts
      )
    }

    copyHelper('gitignore', '.gitignore')
    copyHelper('eslintrc.js', '.eslintrs.js')
    copyHelper('babelrc', '.babelrc')
    copyHelper('static/index.html', 'static/index.html', { camelName })
    copyHelper('src/index.js', 'src/index.js', { camelName })
    copyHelper('src/plugin.js', 'src/plugin.js', { name, camelName })
    copyHelper('config/webpack.config.dev.js', 'config/webpack.config.dev.js', { name })
    copyHelper('config/webpack.config.prod.js', 'config/webpack.config.prod.js', { name })
    copyHelper('_package.json', 'package.json', { name })
  }

}

'use strict'
const Generator = require('yeoman-generator')
const camelCase = require('lodash.camelcase')
const utils = require('../../utils/utils')

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

    const ch = utils.copyHelper(this)

    ch('gitignore', '.gitignore')
    ch('eslintrc.js', '.eslintrs.js')
    ch('babelrc', '.babelrc')
    ch('README.md', 'README.md', { camelName, name })
    ch('static/index.html', 'static/index.html', { camelName })
    ch('src/index.js', 'src/index.js', { camelName })
    ch('src/plugin.js', 'src/plugin.js', { name, camelName })
    ch('config/webpack.config.dev.js', 'config/webpack.config.dev.js', { name })
    ch('config/webpack.config.prod.js', 'config/webpack.config.prod.js', { name })
    ch('_package.json', 'package.json', { name, camelName })
  }

}

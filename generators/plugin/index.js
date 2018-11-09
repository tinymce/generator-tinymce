const Generator = require('yeoman-generator')
const _ = require('lodash')
const utils = require('../../utils')

module.exports = class TypeScript extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.option('name', {
      type: String,
      required: true,
      desc: 'Name of the plugin'
    })
  }

  initializing () {
    const name = this.options.name
    const camelName = _.camelCase(name)

    const ch = utils.copyHelper(this)

    ch('README.md', 'README.md', { name, camelName })
  }
}

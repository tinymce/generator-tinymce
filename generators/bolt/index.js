'use strict'
const Generator = require('yeoman-generator')
const _ = require('lodash')
const utils = require('../../utils')

module.exports = class Bolt extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.option('name', {
      type: String,
      required: true,
      desc: 'Name of the plugin'
    })

    this.option('internal', {
      type: Boolean,
      required: true,
      desc: 'Is it a core plugin?'
    })
  }

  default () {
    const {name, internal} = this.options
    const camelName = _.camelCase(name)
    const pascalName = name.split('-').map(_.startCase).join('')
    const ch = utils.copyHelper(this)

    ch('src/demo/html/demo.html', 'src/demo/html/demo.html', { camelName, name })
    ch('src/demo/js/demo/Demo.js', 'src/demo/js/demo/Demo.js', { camelName, name, pascalName })
    ch('src/main/js/core/Adder.js', 'src/main/js/core/Adder.js', { camelName })
    ch('src/main/js/Plugin.js', 'src/main/js/Plugin.js', { camelName })
    ch('src/main/less/content.less', 'src/main/less/content.less', { name })
    ch('src/test/js/atomic/core/AdderTest.js', 'src/test/js/atomic/core/AdderTest.js', { camelName })
    ch('src/test/js/browser/plugin/PluginTest.js', 'src/test/js/browser/plugin/PluginTest.js', { camelName })
    ch('src/test/eslintrc', 'src/test/.eslintrc', { internal })

    if (!internal) {
      ch('config/bolt/atomic.js', 'config/bolt/atomic.js')
      ch('config/bolt/browser.js', 'config/bolt/browser.js', { internal, camelName })
      ch('config/bolt/demo.js', 'config/bolt/demo.js', { camelName, internal })
      ch('config/bolt/prod.js', 'config/bolt/prod.js', { camelName })
      ch('src/demo/js/demo/Demo.js', 'src/demo/js/demo/Demo.js', { camelName, name, pascalName })
      ch('editorconfig', '.editorconfig')
      ch('eslintignore', '.eslintignore')
      ch('eslintrc', '.eslintrc')
      ch('Gruntfile.js', 'Gruntfile.js', { camelName, name })
      ch('_package.json', 'package.json', { camelName, name })
      ch('README.md', 'README.md', { camelName })
    } else {
      ch('config/bolt/atomic_internal.js', 'config/bolt/atomic.js')
      ch('config/bolt/browser_internal.js', 'config/bolt/browser.js')
      ch('config/bolt/demo_internal.js', 'config/bolt/demo.js', { camelName })
      ch('config/bolt/prod_internal.js', 'config/bolt/prod.js', { camelName })
      ch('config/bolt/test_internal.js', 'config/bolt/test.js', { camelName })
      ch('src/demo/js/demo/Demo_internal.js', 'src/demo/js/demo/Demo.js', { camelName, name, pascalName })
      ch('internal_Gruntfile.js', 'Gruntfile.js', { name, camelName })
      ch('internal_README.md', 'README.md', { name, camelName })
    }
  }
}

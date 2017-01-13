'use strict'
const Generator = require('yeoman-generator')
const _ = require('lodash')
const utils = require('../../utils/utils')

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
    const ch = utils.copyHelper(this)

    ch('config/bolt/atomic.js', 'config/bolt/atomic.js')
    ch('config/bolt/browser.js', 'config/bolt/browser.js', { internal })
    ch('config/bolt/demo.js', 'config/bolt/demo.js', { camelName })
    ch('config/bolt/prod.js', 'config/bolt/prod.js', { camelName })
    ch('src/demo/html/demo.html', 'src/demo/html/demo.html', { camelName, name })
    ch('src/demo/js/tinymce/name.demo.Demo.js', 'src/demo/js/tinymce/' + name + '/demo/Demo.js', { camelName, name })
    ch('src/main/js/tinymce/name.core.Adder.js', 'src/main/js/tinymce/' + name + '/core/Adder.js', { camelName })
    ch('src/main/js/tinymce/name.plugin.Plugin.js', 'src/main/js/tinymce/' + name + '/plugin/Plugin.js', { camelName })
    ch('src/main/less/content.less', 'src/main/less/content.less', { name })
    ch('src/test/js/atomic/core/AdderTest.js', 'src/test/js/atomic/core/AdderTest.js', { camelName })
    ch('src/test/js/browser/plugin/PluginTest.js', 'src/test/js/atomic/browser/PluginTest.js', { camelName })
    ch('src/test/eslintrc', 'src/test/.eslintrc')

    if (!internal) {
      ch('editorconfig', '.editorconfig')
      ch('eslintignore', '.eslintignore')
      ch('eslintrc', '.eslintrc')
      ch('Gruntfile.js', 'Gruntfile.js', { camelName, name })
      ch('_package.json', 'package.json', { camelName, name })
      ch('README.md', 'README.md', { camelName })
    }
  }
}

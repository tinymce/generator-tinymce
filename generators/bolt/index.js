'use strict'
const Generator = require('yeoman-generator')
const _ = require('lodash')
const path = require('path')
const utils = require(path.join(__dirname, '../../utils'))

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
    ch('config/bolt/browser.js', 'config/bolt/browser.js', { internal, camelName })
    ch('config/bolt/demo.js', 'config/bolt/demo.js', { camelName, internal })
    ch('config/bolt/prod.js', 'config/bolt/prod.js', { camelName })
    ch('src/demo/html/demo.html', 'src/demo/html/demo.html', { camelName, name })
    ch('src/demo/js/tinymce/name.demo.Demo.js', 'src/demo/js/tinymce/' + camelName + '/demo/Demo.js', { camelName, name })
    ch('src/main/js/tinymce/name.core.Adder.js', 'src/main/js/tinymce/' + camelName + '/core/Adder.js', { camelName })
    ch('src/main/js/tinymce/name.plugin.Plugin.js', 'src/main/js/tinymce/' + camelName + '/plugin/Plugin.js', { camelName })
    ch('src/main/less/content.less', 'src/main/less/content.less', { name })
    ch('src/test/js/atomic/core/AdderTest.js', 'src/test/js/atomic/core/AdderTest.js', { camelName })
    ch('src/test/js/browser/plugin/PluginTest.js', 'src/test/js/browser/plugin/PluginTest.js', { camelName })
    ch('src/test/eslintrc', 'src/test/.eslintrc', { internal })

    if (!internal) {
      ch('editorconfig', '.editorconfig')
      ch('eslintignore', '.eslintignore')
      ch('eslintrc', '.eslintrc')
      ch('Gruntfile.js', 'Gruntfile.js', { camelName, name })
      ch('_package.json', 'package.json', { camelName, name })
      ch('README.md', 'README.md', { camelName })
    } else {
      ch('internal_Gruntfile.js', 'Gruntfile.js', { name })
      ch('internal_README.md', 'README.md', { name, camelName })
    }
  }
}

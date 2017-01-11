'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
const kebabCase = require('lodash.kebabcase')

const utils = require('../../utils/utils')

module.exports = class PluginGenerator extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.option('yarn', {
      type: Boolean,
      desc: 'Use yarn instead of npm as a package manager',
      required: false,
      default: false
    })
  }

  prompting () {
    this.log(
      yosay('Welcome to the\n' + chalk.red('TinyMCE plugin') + '\ngenerator!')
      )

    var prompts = [
      {
        name: 'name',
        message: 'Plugin name:',
        default: path.basename(process.cwd()),
        filter: str => kebabCase(str),
        validate: str => str.length > 0
      },
      {
        name: 'language',
        message: 'What\'s your jam?',
        type: 'list',
        choices: [
          {
            name: 'ES2015',
            value: 'es2015'
          },
          {
            name: 'TypeScript',
            value: 'ts'
          }
        ]
      },
      {
        name: 'yarn',
        type: 'confirm',
        message: 'Use yarn instead of npm?',
        default: false,
        when: !this.options.yarn
      }
    ]

    return this.prompt(prompts).then(props => {
      this.props = props
    })
  }

  default () {
    utils.handleDir(this)

    this.composeWith(require.resolve('../' + this.props.language), { name: this.props.name })
    this.composeWith(require.resolve('generator-license/app'), {output: 'src/LICENSE'})
  }

  install () {
    const useYarn = this.options.yarn || this.props.yarn

    this.installDependencies({
      bower: false,
      yarn: useYarn,
      npm: !useYarn
    })
  }
}

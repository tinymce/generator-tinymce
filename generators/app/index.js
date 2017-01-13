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

    this.option('skip-git', {
      type: Boolean,
      desc: 'Skip git repo init',
      required: false,
      default: false
    })

    this.option('yarn', {
      type: Boolean,
      desc: 'Use yarn instead of npm',
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
          { name: 'ES2015', value: 'es2015' },
          { name: 'TypeScript', value: 'ts' }
        ]
      },
      {
        name: 'yarn',
        type: 'confirm',
        message: 'Use yarn instead of npm?',
        default: false,
        when: !this.options.yarn
      },
      {
        name: 'skipGit',
        type: 'confirm',
        message: 'Skip git repo initialization?',
        default: false,
        when: !this.options.skipGit
      }
    ]

    return this.prompt(prompts).then(props => {
      this.props = props
    })
  }

  default () {
    utils.handleDir(this)
    const { name, language } = this.props

    this.composeWith(require.resolve('../' + language), { name })
    this.composeWith(require.resolve('generator-license/app'), { output: 'src/LICENSE' })
  }

  install () {
    const useYarn = this.options.yarn || this.props.yarn
    const skipGit = this.options.skipGit || this.props.skipGit

    this.installDependencies({
      bower: false,
      yarn: useYarn,
      npm: !useYarn
    })

    if (!skipGit) {
      utils.gitInit(
        this,
        `Initial commit on ${this.props.name} TinyMCE plugin.`
      )
    }
  }
}

const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
const _ = require('lodash')
const utils = require('../../utils')

module.exports = class PluginGenerator extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.option('skip-git', {
      type: Boolean,
      desc: 'Skip git repo init',
      required: false,
      default: false
    })
  }

  prompting () {
    this.log(
      yosay('Welcome to the\n' + chalk.red('TinyMCE package') + '\ngenerator!')
    )

    var prompts = [
      {
        name: 'packageName',
        message: 'Package name:',
        default: path.basename(process.cwd()),
        filter: str => _.kebabCase(str),
        validate: str => str.length > 0
      },
      {
        name: 'type',
        message: 'Are you creating a package or a plugin',
        type: 'list',
        choices: [
          { name: 'Package', value: 'package' },
          { name: 'Plugin', value: 'plugin' }
        ]
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
    const packageName = this.props.packageName
    utils.handleDir(this, packageName)

    this.composeWith(require.resolve('../' + this.props.type), { name: packageName, internal: this.options.internal })

    this.composeWith(
      require.resolve('generator-license/app'),
      {
        name: 'Tiny Technologies Inc',
        email: 'is-accounts@ephox.com',
        website: 'https://tiny.cloud/',
        license: 'Apache-2.0'
      }
    )
  }

  install () {
    const skipGit = this.options.skipGit || this.props.skipGit

    if (!skipGit) {
      utils.gitInit(
        this,
        `Initial commit on ${this.props.packageName} TinyMCE plugin.`
      )
    }

    this.installDependencies({
      bower: false,
      yarn: false,
      npm: true
    })
  }
}

'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
const _ = require('lodash')

module.exports = Generator.extend({
  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the delightful ' + chalk.red('generator-tiny-plugin') + ' generator!'
    ))

    var prompts = [
      {
        name: 'name',
        message: 'Plugin name:',
        default: path.basename(process.cwd()),
        filter: _.kebabCase,
        validate: str => str.length > 0
      }
    ]

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props
    }.bind(this))
  },

  default () {
    console.log('default')
    this.composeWith(require.resolve('generator-license/app'), {
      name: 'Some name',
      email: 'mail@internet.com',
      website: 'www.web.se'
    })
  },

  writing () {
    console.log('writing')
    const {name} = this.props
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath(name + 'dummyfile.txt')
    )
  },

  install () {
    this.installDependencies()
  }
})

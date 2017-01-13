'use strict'
var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')

describe('generator-tiny-plugin:app ts', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'cool-plugin',
        language: 'ts',
        license: 'MIT'
      })
      .toPromise()
  })

  it('creates files', function () {
    assert.file([
      'package.json',
      'tslint.json',
      'tsconfig.json',
      'typings.json',
      'README.md',
      '.gitignore',
      'src/LICENSE',
      'src/index.ts',
      'src/plugin.ts',
      'static/index.html',
      'config/webpack.config.dev.js',
      'config/webpack.config.prod.js'
    ])
  })

  it('has correct name in package.json', () => {
    assert.fileContent('package.json', '"name": "cool-plugin"')
    assert.fileContent('config/webpack.config.prod.js', 'const pluginName = "cool-plugin"')
    assert.fileContent('README.md', '# coolPlugin')
  })
})

describe('generator-tiny-plugin:app es2015', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'cool-plugin',
        language: 'es2015',
        license: 'MIT'
      })
      .toPromise()
  })

  it('creates files', function () {
    assert.file([
      'package.json',
      '.eslintrc.js',
      '.babelrc',
      'README.md',
      '.gitignore',
      'src/LICENSE',
      'src/index.js',
      'src/plugin.js',
      'static/index.html',
      'config/webpack.config.dev.js',
      'config/webpack.config.prod.js'
    ])
  })

  it('has correct name in package.json etc', () => {
    assert.fileContent('package.json', '"name": "cool-plugin"')
    assert.fileContent('config/webpack.config.prod.js', 'const pluginName = \'cool-plugin\'')
    assert.fileContent('README.md', '# coolPlugin')
  })
})

describe('generator-tiny-plugin:app bolt', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'cool-plugin',
        language: 'bolt',
        license: 'MIT'
      })
      .toPromise()
  })

  it('creates files', function () {
    assert.file([
      'config/bolt/atomic.js',
      'config/bolt/browser.js',
      'config/bolt/demo.js',
      'config/bolt/prod.js',
      'src/demo/html/demo.html',
      'src/demo/js/tinymce/cool-plugin/demo/Demo.js',
      'src/main/js/tinymce/cool-plugin/core/Adder.js',
      'src/main/js/tinymce/cool-plugin/plugin/Plugin.js',
      'src/main/less/content.less',
      'src/test/js/atomic/core/AdderTest.js',
      'src/test/js/atomic/browser/PluginTest.js',
      'src/test/.eslintrc',
      'src/text/license.txt',
      '.editorconfig',
      '.eslintignore',
      '.eslintrc',
      'Gruntfile.js',
      'package.json',
      'README.md'
    ])
  })

  it('has correct name in package.json etc', () => {
    assert.fileContent('package.json', '"name": "cool-plugin"')
    // assert.fileContent('config/webpack.config.prod.js', 'const pluginName = \'cool-plugin\'')
    assert.fileContent('README.md', '# coolPlugin')

    assert.fileContent('config/bolt/browser.js', 'source(\'amd\', \'ephox/tinymce\', \'../../node_modules/tinymce\', mapper.constant(\'../../node_modules/tinymce/tinymce\')),')
  })
})

describe('generator-tiny-plugin:app bolt with --internal flag', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({
        internal: true
      })
      .withPrompts({
        name: 'cool-plugin',
        language: 'bolt',
        license: 'MIT'
      })
      .toPromise()
  })

  it('creates files', function () {
    assert.file([
      'config/bolt/atomic.js',
      'config/bolt/browser.js',
      'config/bolt/demo.js',
      'config/bolt/prod.js',
      'src/demo/html/demo.html',
      'src/demo/js/tinymce/cool-plugin/demo/Demo.js',
      'src/main/js/tinymce/cool-plugin/core/Adder.js',
      'src/main/js/tinymce/cool-plugin/plugin/Plugin.js',
      'src/main/less/content.less',
      'src/test/js/atomic/core/AdderTest.js',
      'src/test/js/atomic/browser/PluginTest.js',
      'src/test/.eslintrc'
    ])

    assert.noFile([
      '.editorconfig',
      '.eslintignore',
      '.eslintrc',
      'Gruntfile.js',
      'package.json',
      'README.md',
      'src/text/license.txt',
      '.git'
    ])
  })

  it('has correct name in package.json etc', () => {
    assert.fileContent('config/bolt/browser.js', 'source(\'amd\', \'ephox/tinymce\', \'\', mapper.constant(\'../../../../../tinymce\')),')
    // assert.fileContent('package.json', '"name": "cool-plugin"')
    // assert.fileContent('config/webpack.config.prod.js', 'const pluginName = \'cool-plugin\'')
    // assert.fileContent('README.md', '# coolPlugin')
  })
})

describe('generator-tiny-plugin:app do not skip git', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'cool-plugin',
        language: 'es2015',
        license: 'MIT'
      })
      .toPromise()
  })

  it('creates git repo', function () {
    assert.file('.git')
  })
})

describe('generator-tiny-plugin:app skip git', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipGit: true })
      .withPrompts({
        name: 'cool-plugin',
        language: 'es2015',
        license: 'MIT'
      })
      .toPromise()
  })

  it('does not create git repo', function () {
    assert.noFile('.git')
  })
})

'use strict'
var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')

describe('generator-tiny-plugin:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'cool plugin',
        license: 'MIT'
      })
      .toPromise()
  })

  it('creates files', function () {
    assert.file([
      'cool-plugin.txt',
      'src/LICENSE'
    ])
  })
})

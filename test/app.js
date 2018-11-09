var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')

describe('generator-tinymce:plugin', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        packageName: 'cool-plugin',
        type: 'plugin',
        license: 'MIT',
        name: 'Tester McTest',
        email: 'mail@mctest.com',
        website: 'www.mctest.com'
      })
      .toPromise()
  })

  it('creates files', function () {
    assert.file([
      // 'package.json',
      // 'tslint.json',
      // 'tsconfig.json',
      // 'typings.json',
      'README.md'
      // '.gitignore',
      // 'src/LICENSE',
      // 'src/index.ts',
      // 'src/plugin.ts',
      // 'static/index.html',
      // 'config/webpack.config.dev.js',
      // 'config/webpack.config.prod.js'
    ])
  })

  it('has correct name in package.json', function () {
    // assert.fileContent('package.json', '"name": "cool-plugin"')
    // assert.fileContent('config/webpack.config.prod.js', 'const pluginName = "cool-plugin"')
    assert.fileContent('README.md', '# coolPlugin')
    // assert.fileContent('src/LICENSE', 'Tester McTest <mail@mctest.com> (www.mctest.com)')
  })
})

describe('generator-tinymce:package', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        packageName: 'cool-package',
        type: 'package',
        license: 'MIT',
        name: 'Tester McTest',
        email: 'mail@mctest.com',
        website: 'www.mctest.com'
      })
      .toPromise()
  })

  it('creates files', function () {
    assert.file([
      // 'package.json',
      // 'tslint.json',
      // 'tsconfig.json',
      // 'typings.json',
      'README.md'
      // '.gitignore',
      // 'src/LICENSE',
      // 'src/index.ts',
      // 'src/plugin.ts',
      // 'static/index.html',
      // 'config/webpack.config.dev.js',
      // 'config/webpack.config.prod.js'
    ])
  })

  it('has correct name in package.json', function () {
    // assert.fileContent('package.json', '"name": "cool-plugin"')
    // assert.fileContent('config/webpack.config.prod.js', 'const pluginName = "cool-plugin"')
    assert.fileContent('README.md', 'coolPlugin package')
    // assert.fileContent('src/LICENSE', 'Tester McTest <mail@mctest.com> (www.mctest.com)')
  })
})

// describe('generator-tinymce:app es2015', function () {
//   before(function () {
//     return helpers.run(path.join(__dirname, '../generators/app'))
//       .withPrompts({
//         pluginName: 'cool-plugin',
//         language: 'es2015',
//         license: 'MIT',
//         name: 'Tester McTest',
//         email: 'mail@mctest.com',
//         website: 'www.mctest.com'
//       })
//       .toPromise()
//   })

//   it('creates files', function () {
//     assert.file([
//       'package.json',
//       '.eslintrc',
//       '.babelrc',
//       'README.md',
//       '.gitignore',
//       'src/LICENSE',
//       'src/index.js',
//       'src/plugin.js',
//       'static/index.html',
//       'config/webpack.config.dev.js',
//       'config/webpack.config.prod.js'
//     ])
//   })

//   it('has correct name in package.json etc', function () {
//     assert.fileContent('package.json', '"name": "cool-plugin"')
//     assert.fileContent('config/webpack.config.prod.js', 'const pluginName = \'cool-plugin\'')
//     assert.fileContent('README.md', '# coolPlugin')
//   })
// })

// describe('generator-tinymce:app bolt', function () {
//   before(function () {
//     return helpers.run(path.join(__dirname, '../generators/app'))
//       .withPrompts({
//         pluginName: 'cool-plugin',
//         language: 'bolt',
//         license: 'MIT',
//         name: 'Tester McTest',
//         email: 'mail@mctest.com',
//         website: 'www.mctest.com'
//       })
//       .toPromise()
//   })

//   it('creates files', function () {
//     assert.file([
//       'config/bolt/atomic.js',
//       'config/bolt/browser.js',
//       'config/bolt/demo.js',
//       'config/bolt/prod.js',
//       'config/bolt/test.js',
//       'src/demo/html/demo.html',
//       'src/demo/js/demo/Demo.js',
//       'src/main/js/core/Adder.js',
//       'src/main/js/Plugin.js',
//       'src/main/less/content.less',
//       'src/test/js/atomic/core/AdderTest.js',
//       'src/test/js/browser/plugin/PluginTest.js',
//       'src/test/.eslintrc',
//       'src/text/license.txt',
//       '.editorconfig',
//       '.eslintignore',
//       '.eslintrc',
//       'Gruntfile.js',
//       'package.json',
//       'README.md'
//     ])
//   })

//   it('has correct name in package.json etc', function () {
//     assert.fileContent('package.json', '"name": "cool-plugin"')
//     assert.fileContent('README.md', '# coolPlugin')
//     assert.fileContent('config/bolt/browser.js', 'source(\'amd\', \'ephox/tinymce\', \'../../node_modules/tinymce\', mapper.constant(\'../../node_modules/tinymce/tinymce\')),')
//     assert.fileContent('config/bolt/browser.js', 'source(\'amd\', \'ephox\', \'../../node_modules/@ephox\', mapper.repo(\'js\', mapper.flat))')
//     assert.fileContent('src/test/js/browser/plugin/PluginTest.js', 'tinyApis.sAssertContent(\'<p>hi from coolPlugin!</p>\')')
//   })
// })

// describe('generator-tinymce:app bolt with --internal flag', function () {
//   before(function () {
//     return helpers.run(path.join(__dirname, '../generators/app'))
//       .withOptions({
//         internal: true
//       })
//       .withPrompts({
//         pluginName: 'cool-plugin',
//         language: 'bolt',
//         license: 'MIT',
//         name: 'Tester McTest',
//         email: 'mail@mctest.com',
//         website: 'www.mctest.com'
//       })
//       .toPromise()
//   })

//   it('creates files', function () {
//     assert.file([
//       'config/bolt/atomic.js',
//       'config/bolt/browser.js',
//       'config/bolt/demo.js',
//       'config/bolt/prod.js',
//       'config/bolt/test.js',
//       'src/demo/html/demo.html',
//       'src/demo/js/demo/Demo.js',
//       'src/main/js/core/Adder.js',
//       'src/main/js/Plugin.js',
//       'src/main/less/content.less',
//       'src/test/js/atomic/core/AdderTest.js',
//       'src/test/js/browser/plugin/PluginTest.js',
//       'src/test/.eslintrc',
//       'Gruntfile.js',
//       'README.md'
//     ])

//     assert.noFile([
//       '.editorconfig',
//       '.eslintignore',
//       '.eslintrc',
//       'package.json',
//       'src/text/license.txt',
//       '.git'
//     ])
//   })

//   it('has correct name in package.json etc', function () {
//     assert.fileContent('src/test/.eslintrc', '"extends": "../../../../../.eslintrc"')
//     assert.fileContent('Gruntfile.js', 'src: ["src/main/js/Plugin.js"]')
//     assert.fileContent('README.md', '\'cool-plugin-plugin\': {path: \'js/tinymce/plugins/cool-plugin\'}')
//     assert.fileContent('README.md', 'js/tinymce/plugins/cool-plugin/plugin.js')
//     assert.fileContent('src/demo/js/demo/Demo.js', 'CoolPluginPlugin();')
//   })
// })

// describe('generator-tinymce:app do not skip git', function () {
//   before(function () {
//     return helpers.run(path.join(__dirname, '../generators/app'))
//       .withPrompts({
//         pluginName: 'cool-plugin',
//         language: 'es2015',
//         license: 'MIT',
//         name: 'Tester McTest',
//         email: 'mail@mctest.com',
//         website: 'www.mctest.com'
//       })
//       .toPromise()
//   })

//   it('creates git repo', function () {
//     assert.file('.git')
//   })
// })

// describe('generator-tinymce:app skip git', function () {
//   before(function () {
//     return helpers.run(path.join(__dirname, '../generators/app'))
//       .withOptions({ skipGit: true })
//       .withPrompts({
//         pluginName: 'cool-plugin',
//         language: 'es2015',
//         license: 'MIT',
//         name: 'Tester McTest',
//         email: 'mail@mctest.com',
//         website: 'www.mctest.com'
//       })
//       .toPromise()
//   })

//   it('does not create git repo', function () {
//     assert.noFile('.git')
//   })
// })

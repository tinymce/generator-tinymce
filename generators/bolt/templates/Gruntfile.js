/* eslint-env node */

module.exports = function (grunt) {
  var packageData = grunt.file.readJSON('package.json')
  var BUILD_VERSION = packageData.version + '-' + (process.env.BUILD_NUMBER ? process.env.BUILD_NUMBER : '0')
  var pluginName = '<%= name %>'

  grunt.initConfig({
    pkg: packageData,

    watch: {
      files: ['src/**/*.js'],
      options: {
        livereload: 35729
      }
    },

    eslint: {
      options: {
        config: '.eslintrc'
      },

      main: ['src/**/*.js']
    },

    'bolt-init': {
      'main': {
        config_dir: 'config/bolt'
      }
    },

    concat: {
      license: {
        options: {
          process: function (src) {
            var buildSuffix = process.env.BUILD_NUMBER ? '-' + process.env.BUILD_NUMBER : ''
            return src.replace(/@BUILD_NUMBER@/g, packageData.version + buildSuffix)
          }
        },
        files: {
          // .min.js in both places is not a typo it ensures that the output is always minified
          'dist/<%= name %>/plugin.js': ['src/text/license-header.js', 'scratch/inline/plugin.js'],
          'dist/<%= name %>/plugin.min.js': ['src/text/license-header.js', 'scratch/inline/plugin.min.js']
        }
      }
    },

    'bolt-build': {
      'main': {
        config_js: 'config/bolt/prod.js',
        main: 'tinymce.pillow.plugin.Plugin',
        output_dir: 'scratch',
        filename: 'plugin',
        generate_inline: true,
        minimise_module_names: true,

        files: {
          src: ['src/main/js/tinymce/pillow/plugin/Plugin.js']
        }
      }
    },

    less: {
      content: {
        options: {
          cleancss: true,
          strictImports: true,
          compress: true
        },

        files: {
          'dist/<%= name %>/content.min.css': 'src/main/less/content.less'
        }
      }
    },

    uglify: {
      'bolt-plugin': {
        files: [
          {
            src: 'scratch/inline/plugin.js',
            dest: 'scratch/inline/plugin.min.js'
          }
        ]
      }
    },

    test: {

    },

    copy: {
      css: {
        files: [
          {cwd: 'src/text', src: ['license.txt'], dest: 'dist/' + pluginName, expand: true},
          {src: ['changelog.txt'], dest: 'dist/' + pluginName, expand: true}
        ]
      }
    }
  })

  grunt.task.registerTask('tunic', 'Serves browser tests using tunic', function () {
    var done = this.async()
    var tests = grunt.file.expand('src/test/js/**/*.js')

    grunt.util.spawn({
      cmd: 'tunic',
      args: [
        'config/bolt/browser.js'
      ].concat(tests),
      opts: {stdio: 'inherit'}
    }, function () {
      done()
    })
  })

  require('load-grunt-tasks')(grunt)
  grunt.loadNpmTasks('@ephox/bolt')

  grunt.registerTask('version', 'Creates a version file', function () {
    grunt.file.write('dist/' + pluginName + '/version.txt', BUILD_VERSION)
  })

  grunt.registerTask('lint', ['eslint'])
  grunt.registerTask('minify', ['bolt-build', 'uglify', 'less', 'concat:license', 'copy', 'version'])
  grunt.registerTask('default', ['lint', 'bolt-init', 'minify'])
}

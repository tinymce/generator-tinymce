define('tinymce.<%= camelName %>.demo.Demo', [
  'global!tinymce',
  'tinymce.<%= camelName %>.plugin.Plugin'
], function (tinymce, Plugin) { // eslint-disable-line no-unused-vars
  return function () {
    tinymce.init({
      selector: 'textarea.editor',
      plugins: '<%= camelName %>',
      toolbar: '<%= camelName %>'
    });
  };
});

define(
'tinymce.plugins.<%= camelName %>.demo.Demo',
  [
    'ephox/tinymce',
    'tinymce.plugins.<%= camelName %>.Plugin'
  ],
function (tinymce, <%= pascalName %>Plugin) {
  <%= pascalName %>Plugin();

  return function () {
    tinymce.init({
      selector: 'textarea.editor',
      plugins: '<%= camelName %>',
      toolbar: '<%= camelName %>'
    });
  };
});

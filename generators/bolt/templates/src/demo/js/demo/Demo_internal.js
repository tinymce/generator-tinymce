define(
  'tinymce.plugins.<%= camelName %>.demo.Demo',
  [
    'tinymce.core.EditorManager',
    'tinymce.themes.modern.Theme',
    'tinymce.plugins.<%= camelName %>.Plugin'
  ],
  function (EditorManager, ModernTheme, <%= pascalName %>Plugin) { // eslint-disable-line no-unused-vars
  return function () {
    ModernTheme();
    <%= pascalName %>Plugin();

    EditorManager.init({
      selector: 'textarea.editor',
      skin_url: "../../../../../skins/lightgray/dist/lightgray",
      plugins: '<%= camelName %>',
      toolbar: '<%= camelName %>'
    });
  };
});

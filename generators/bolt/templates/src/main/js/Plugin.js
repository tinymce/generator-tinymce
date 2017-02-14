define('tinymce.plugins.<%= camelName %>.Plugin', [
  'tinymce.core.PluginManager'
], function (
  PluginManager
) {
  var Plugin = function (editor/*, url*/) {
    editor.addButton('<%= camelName %>', {
      text: '<%= camelName %>',
      icon: false,
      onclick: function () {
        editor.insertContent('hi from <%= camelName %>!');
      }
    });
  };

  PluginManager.add('<%= camelName %>', Plugin);

  return function () {};
});

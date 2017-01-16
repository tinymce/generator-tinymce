define('tinymce.<%= camelName %>.plugin.Plugin', [
  'global!tinymce',
  'global!tinymce.Env',
  'global!tinymce.PluginManager'
], function (
  tinymce, Env, PluginManager
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

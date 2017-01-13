define('tinymce.<%= camelName %>.plugin.Plugin', [
  'global!tinymce',
  'global!tinymce.Env',
  'global!tinymce.PluginManager'
], function (
  tinymce, Env, PluginManager
) {
  var Plugin = function (editor/*, url*/) {
    editor.addButton('<%= camelName %>', {
      text: '<%= camelName %> button',
      icon: false,
      onclick: function () {
        // Open window
        editor.windowManager.open({
          title: '<%= camelName %>',
          body: [
            {type: 'textbox', name: 'title'}
          ],
          onsubmit: function (e) {
            // Insert content when the window form is submitted
            var bigString = e.data.title.toUpperCase();
            editor.insertContent(bigString);
          }
        });
      }
    });
  };

  PluginManager.add('<%= camelName %>', Plugin);

  return function () {};
});

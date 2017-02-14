asynctest('browser.plugin.PluginTest', [
  'tinymce.plugins.<%= camelName %>.Plugin',
  'ephox.mcagar.api.TinyLoader',
  'ephox.agar.api.Pipeline',
  'ephox.mcagar.api.TinyApis',
  'ephox.mcagar.api.TinyUi'
], function (
  Plugin, TinyLoader, Pipeline, TinyApis, TinyUi
) {
  var success = arguments[arguments.length - 2];
  var failure = arguments[arguments.length - 1];

  TinyLoader.setup(function (editor, onSuccess, onFailure) {
    var tinyApis = TinyApis(editor);
    var tinyUi = TinyUi(editor);

    Pipeline.async({}, [
      tinyUi.sClickOnToolbar('click on button', 'button'),
      tinyApis.sAssertContent('<p>hi from <%= camelName %>!</p>')
    ], onSuccess, onFailure);
  }, {
    plugins: '<%= camelName %>',
    toolbar: '<%= camelName %>'
  }, success, failure);
});

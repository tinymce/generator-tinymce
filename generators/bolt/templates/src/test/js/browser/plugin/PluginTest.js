asynctest('browser.plugin.PluginTest', [
  'tinymce.<%= camelName %>.plugin.Plugin',
  'ephox.mcagar.api.TinyLoader',
  'ephox.agar.api.Pipeline',
  'ephox.mcagar.api.TinyApis',
  'ephox.mcagar.api.TinyActions',
  'ephox.agar.api.RawAssertions',
  'ephox.agar.api.Step'
], function (
  Plugin, TinyLoader, Pipeline, TinyApis, TinyActions, RawAssertions, Step
) {
  var success = arguments[arguments.length - 2];
  var failure = arguments[arguments.length - 1];

  var sCheckEditorContent = function (editor, expected) {
    return Step.sync(function () {
      var actual = editor.getContent();
      RawAssertions.assertEq('Content should be same', expected, actual);
    });
  };

  TinyLoader.setup(function (editor, onSuccess, onFailure) {
    // var tinyApis = TinyApis(editor);
    // var tinyActions = TinyActions(editor);

    Pipeline.async({}, [
      sCheckEditorContent(editor, 'hej')
    ], onSuccess, onFailure);
  }, {
    plugins: '<%= camelName %>',
    toolbar: '<%= camelName %>'
  }, success, failure);
});

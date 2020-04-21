import { Pipeline, Logger, GeneralSteps } from '@ephox/agar';
import { TinyLoader, TinyApis, TinyUi } from '@ephox/mcagar';
import { UnitTest } from '@ephox/bedrock-client';
import Plugin from '../../../main/ts/Plugin';

// This an example of a browser test of the editor.
UnitTest.asynctest('browser.PluginTest', (success, failure) => {
  Plugin();

  TinyLoader.setup((editor, onSuccess, onFailure) => {
    const tinyUi = TinyUi(editor);
    const tinyApis = TinyApis(editor);

    Pipeline.async({}, [
      Logger.t('test click on button', GeneralSteps.sequence([
        tinyUi.sClickOnToolbar('click <%= name %> button', 'button:contains("<%= name %> button")'),
        tinyApis.sAssertContent('<p>content added from <%= name %></p>')
      ]))
    ], onSuccess, onFailure);
  }, {
    plugins: '<%= name %>',
    toolbar: '<%= name %>'
  }, success, failure);
});

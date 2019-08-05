declare const tinymce: any;

const setup = (editor, url) => {
  editor.ui.registry.addButton('<%= name %>', {
    text: '<%= name %> button',
    onAction: () => {
      // tslint:disable-next-line:no-console
      editor.setContent('<p>content added from <%= name %></p>');
    }
  });
};

export default () => {
  tinymce.PluginManager.add('<%= name %>', setup);
};

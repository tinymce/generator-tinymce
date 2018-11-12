declare const tinymce: any;

const setup = (editor, url) => {
  editor.addButton('<%= name %>', {
    text: '<%= name %> button',
    icon: false,
    onclick: () => {
      // tslint:disable-next-line:no-console
      editor.setContent('<p>content added from <%= name %></p>');
    }
  });
};

tinymce.PluginManager.add('<%= name %>', setup);

// tslint:disable-next-line:no-empty
export default () => {};
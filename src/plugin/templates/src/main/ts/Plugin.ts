import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  editor.ui.registry.addButton('<%= name %>', {
    text: '<%= name %> button',
    onAction: () => {
      editor.setContent('<p>content added from <%= name %></p>');
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('<%= name %>', setup);
};

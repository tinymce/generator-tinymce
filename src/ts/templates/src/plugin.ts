import * as kebabCase from "lodash/kebabCase";

const plugin = (editor: any, url: String) => {
  editor.addButton("<%= camelName %>", {
    text: "Kebabify",
    icon: false,
    onclick: () => {
      // Open window
      editor.windowManager.open({
        title: "Kebabify",
        body: [
          {type: "textbox", name: "title"}
        ],
        onsubmit (e: any) {
          // Insert content when the window form is submitted
          const kebabbyString: String = kebabCase(e.data.title);
          editor.insertContent(kebabbyString);
        }
      });
    }
  });
};

export default plugin;

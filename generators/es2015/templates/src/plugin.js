import kebabCase from 'lodash.kebabcase'

const plugin = (editor, url) => {
  editor.addButton('<%= camelName %>', {
    text: 'Kebabify',
    icon: false,
    onclick: () => {
      // Open window
      editor.windowManager.open({
        title: 'Kebabify',
        body: [
          {type: 'textbox', name: 'title'}
        ],
        onsubmit (e) {
          // Insert content when the window form is submitted
          const kebabbyString = kebabCase(e.data.title)
          editor.insertContent(kebabbyString)
        }
      })
    }
  })
}

export default plugin

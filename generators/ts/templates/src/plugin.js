"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kebabCase = require("lodash/kebabCase");
const plugin = (editor, url) => {
    editor.addButton("<%= camelName %>", {
        text: "Kebabify",
        icon: false,
        onclick: () => {
            // Open window
            editor.windowManager.open({
                title: "Kebabify",
                body: [
                    { type: "textbox", name: "title" }
                ],
                onsubmit(e) {
                    // Insert content when the window form is submitted
                    const kebabbyString = kebabCase(e.data.title);
                    editor.insertContent(kebabbyString);
                }
            });
        }
    });
};
exports.default = plugin;

# <%= camelName %> TinyMCE plugin readme

To get this new plugin to work with grunt and bedrock, add the following line to the array of plugin paths 21 to ignore the built `plugin.js` when linting:
```js
"!js/tinymce/plugins/<%= name %>/plugin.js"
```
Add this line to the testDirs array at the end of the Gruntfile:
```js
'js/tinymce/plugins/<%= name %>/src/test'
```
And this line to the `subgrunt` part of the Gruntfile:
```js
'<%= name %>-plugin': {path: 'js/tinymce/plugins/<%= name %>'}
```

Also add the following to the array of paths in `tools/bolt/config/browser.js`:
```js
'../../../js/tinymce/plugins/<%= name %>/config/bolt/browser.js'
```

configure({
  configs: [
    './prod.js'
  ],
  sources: [
    source('amd', 'tinymce.<%= camelName %>.demo', '../../src/demo/js', mapper.hierarchical),
    <% if (!internal) { %>source('amd', 'ephox/tinymce', '../../node_modules/tinymce', mapper.constant('../../node_modules/tinymce/tinymce'))<% } %>]
});

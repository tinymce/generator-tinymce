configure({
  configs: [
    './prod.js'
  ],
  sources: [<% if (internal) { %>
    source('amd', 'tinymce.<%= camelName %>', '../../src/main/js', mapper.hierarchical),
    source('amd', 'ephox/tinymce', '', mapper.constant('../../../../../tinymce')),
		source('amd', 'ephox', '../../../../../../node_modules/@ephox', mapper.repo('js', mapper.flat))<% } %><% if (!internal) { %>
    source('amd', 'ephox/tinymce', '../../node_modules/tinymce', mapper.constant('../../node_modules/tinymce/tinymce')),
    source('amd', 'ephox', '../../node_modules/@ephox', mapper.repo('js', mapper.flat))
  <% } %>]
});

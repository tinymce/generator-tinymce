configure({
  configs: [
    './prod.js'
  ],
  sources: [
  <% if (internal) { %>
    source('amd', 'ephox/tinymce', '', mapper.constant('../../../../../tinymce')),
    source('amd', 'ephox', '../../lib/test', mapper.flat)
  <% } %>
  <% if (!internal) { %>
    source('amd', 'ephox/tinymce', '../../node_modules/tinymce', mapper.constant('../../node_modules/tinymce/tinymce')),
    // this aint pretty, I know, but should be better when mcagar is on npm
    source('amd', 'ephox.mcagar', '../../node_modules/@tinymce/mcagar/src/main/js', mapper.hierarchical),
    source('amd', 'ephox', '../../node_modules/@ephox', mapper.repo('js', mapper.flat))
  <% } %>
  ]
});

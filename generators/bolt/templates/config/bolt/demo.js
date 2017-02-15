configure({
  sources: [
    source('amd', 'tinymce.plugins.<%= camelName %>.demo', '../../src/demo/js', function (id) {
      return mapper.hierarchical(id).replace(/^tinymce\/plugins\/<%= camelName %>\//, '');
    }),
    source('amd', 'tinymce.plugins.<%= camelName %>', '../../src/main/js', function (id) {
      return mapper.hierarchical(id).replace(/^tinymce\/plugins\/<%= camelName %>\//, '');
    }),
    source('amd', 'ephox/tinymce', '', mapper.constant('../../../node_modules/tinymce/tinymce')),
    source('amd', 'ephox', '../../node_modules/@ephox', mapper.repo('js', mapper.flat))
  ]
});

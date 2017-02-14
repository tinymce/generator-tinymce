configure({
  sources: [
    source('amd', 'tinymce.plugins.<%= camelName %>', '../../src/main/js', function (id) {
      return mapper.hierarchical(id).replace(/^tinymce\/plugins\/<%= camelName %>\//, '');
    }),
    source('amd', 'tinymce.core', '../../../../core/dist/globals', mapper.hierarchical)
  ]
});

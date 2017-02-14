configure({
  configs: [
    './prod.js'
  ],
  sources: [
    source('amd', 'tinymce.<%= camelName %>.demo', '../../src/demo/js', mapper.hierarchical),
  ]
});

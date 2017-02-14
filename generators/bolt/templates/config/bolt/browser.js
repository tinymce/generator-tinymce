configure({
  configs: [
    './prod.js'
  ],
  sources: [
    source('amd', 'ephox/tinymce', '../../node_modules/tinymce', mapper.constant('../../node_modules/tinymce/tinymce')),
    source('amd', 'ephox', '../../node_modules/@ephox', mapper.repo('js', mapper.flat))
  ]
});

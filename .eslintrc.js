module.exports = {
  extends: 'plugin:@tinymce/standard',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json'
  },
  env: {
    node: true
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn'
  }
};

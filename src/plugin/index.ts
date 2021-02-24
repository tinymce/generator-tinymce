import * as Generator from 'yeoman-generator';
import { camelCase } from 'lodash';
import * as utils from '../utils';

module.exports = class TypeScript extends Generator {
  public options: {
    name: string;
    description: string;
    author: string;
  };

  public constructor(args, opts) {
    super(args, opts);

    this.option('name', {
      type: String,
      description: 'Name of the plugin'
    });
    this.option('description', {
      type: String,
      description: 'Add a description for the plugin',
      default: ''
    });
  }

  public initializing() {
    const name = this.options.name;
    const description = this.options.description;
    const author = this.options.author;
    const camelName = camelCase(name);

    const copy = utils.copyHelper(this);

    copy('tsconfig.json', 'tsconfig.json');
    copy('eslintrc.js', '.eslintrc.js');
    copy('gitignore', '.gitignore');
    copy('editorconfig', '.editorconfig');
    copy('_package.json', 'package.json', { name, description, author });
    copy('README.md', 'README.md', { name, camelName });
    copy('Gruntfile.js', 'Gruntfile.js', { name });
    copy('CHANGELOG.txt', 'CHANGELOG.txt');
    copy('src/demo/html/index.html', 'src/demo/html/index.html', { name });
    copy('src/demo/ts/Demo.ts', 'src/demo/ts/Demo.ts', { name });
    copy('src/main/ts/Main.ts', 'src/main/ts/Main.ts', { name });
    copy('src/main/ts/Plugin.ts', 'src/main/ts/Plugin.ts', { name });
    copy('src/main/ts/core/AddTwo.ts', 'src/main/ts/core/AddTwo.ts');
    copy('src/test/ts/browser/PluginTest.ts', 'src/test/ts/browser/PluginTest.ts', { name });
    copy('src/test/ts/atomic/AddTwoTest.ts', 'src/test/ts/atomic/AddTwoTest.ts');
  }
};

import * as Generator from 'yeoman-generator';
import { camelCase } from 'lodash';
import * as utils from '../utils';

module.exports = class TypeScript extends Generator {
  public options: { name: string };
  constructor (args, opts) {
    super(args, opts);

    this.option('name', {
      type: String,
      description: 'Name of the plugin'
    });
  }

  public initializing () {
    const name = this.options.name;
    const camelName = camelCase(name);

    const ch = utils.copyHelper(this);

    ch('README.md', 'README.md', { name, camelName });
  }
};

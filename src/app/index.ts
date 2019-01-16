import * as Generator from 'yeoman-generator';
import chalk from 'chalk';
import * as yosay from 'yosay';
import * as path from 'path';
import { kebabCase } from 'lodash';
import * as utils from '../utils';

module.exports = class PluginGenerator extends Generator {
  public props: {
    packageName: string;
    type: 'plugins' | 'package';
    description: string;
  };
  public options: {
    'same-directory': boolean
  };
  constructor (args, opts) {
    super(args, opts);

    this.option('same-directory', {
      type: Boolean,
      description: 'Create the plugin structure in the directory you are currently in.',
      default: false
    });
  }

  public prompting () {
    this.log(
      yosay('Welcome to the\n' + chalk.red('TinyMCE package') + '\ngenerator!')
    );

    const prompts = [
      {
        name: 'packageName',
        message: 'Package name:',
        default: path.basename(process.cwd()),
        filter: (str) => kebabCase(str),
        validate: (str) => str.length > 0
      },
      // {
      //   name: 'type',
      //   message: 'Are you creating a package or a plugin',
      //   type: 'list',
      //   choices: [
      //     { name: 'Package', value: 'package' },
      //     { name: 'Plugin', value: 'plugin' }
      //   ]
      // },
      {
        name: 'description',
        message: 'Add a description',
        type: 'string',
        default: ''
      }
    ];

    return this.prompt(prompts).then((props: any) => {
      this.props = props;
    });
  }

  public default () {
    const packageName = this.props.packageName;
    const description = this.props.description;
    const type = 'plugin'; // this.props.type
    if (this.options['same-directory'] === true) {
      this.log('Generating in current directory.');
    } else {
      utils.handleDir(this, packageName);
    }

    this.composeWith(require.resolve('../' + type), { name: packageName, description });

    this.composeWith(
      require.resolve('generator-license/app'),
      {
        name: 'Tiny Technologies Inc',
        email: 'is-accounts@ephox.com',
        website: 'https://tiny.cloud/',
        license: 'Apache-2.0',
        output: 'LICENSE.txt'
      }
    );
  }

  public install () {
    utils.gitInit(this, `Initial commit on ${this.props.packageName} TinyMCE plugin.`);

    this.installDependencies({
      bower: false,
      yarn: false,
      npm: true
    });
  }
};

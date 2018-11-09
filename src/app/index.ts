import * as Generator from 'yeoman-generator';
import chalk from 'chalk';
import * as yosay from 'yosay';
import * as path from 'path';
import { kebabCase } from 'lodash';
import * as utils from '../utils';

module.exports = class PluginGenerator extends Generator {
  public options: {
    skipGit: boolean;
  };
  public props: {
    packageName: string;
    type: 'plugins' | 'package';
    skipGit: boolean;
  };
  constructor (args, opts) {
    super(args, opts);

    this.option('skip-git', {
      type: Boolean,
      description: 'Skip git repo init',
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
      {
        name: 'type',
        message: 'Are you creating a package or a plugin',
        type: 'list',
        choices: [
          { name: 'Package', value: 'package' },
          { name: 'Plugin', value: 'plugin' }
        ]
      },
      {
        name: 'skipGit',
        type: 'confirm',
        message: 'Skip git repo initialization?',
        default: false,
        when: !this.options.skipGit
      }
    ];

    return this.prompt(prompts).then((props: any) => {
      this.props = props;
    });
  }

  public default () {
    const packageName = this.props.packageName;
    utils.handleDir(this, packageName);

    this.composeWith(require.resolve('../' + this.props.type), { name: packageName });

    this.composeWith(
      require.resolve('generator-license/app'),
      {
        name: 'Tiny Technologies Inc',
        email: 'is-accounts@ephox.com',
        website: 'https://tiny.cloud/',
        license: 'Apache-2.0'
      }
    );
  }

  public install () {
    const skipGit = this.options.skipGit || this.props.skipGit;

    if (!skipGit) {
      utils.gitInit(
        this,
        `Initial commit on ${this.props.packageName} TinyMCE plugin.`
      );
    }

    this.installDependencies({
      bower: false,
      yarn: false,
      npm: true
    });
  }
};

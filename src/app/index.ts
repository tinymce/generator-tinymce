import * as Generator from 'yeoman-generator';
import * as chalk from 'chalk';
import * as yosay from 'yosay';
import * as path from 'path';
import { kebabCase } from 'lodash';
import * as utils from '../utils';

module.exports = class PluginGenerator extends Generator {
  public props: {
    packageName: string;
    description: string;
    author: string;
    initGit: boolean;
  };
  public options: {
    'same-directory': boolean;
  };

  public constructor(args, opts) {
    super(args, opts);

    this.option('same-directory', {
      type: Boolean,
      description: 'Create the plugin structure in the directory you are currently in.',
      default: false
    });
  }

  public prompting() {
    this.log(
      yosay('Welcome to the\n' + chalk.red('TinyMCE package') + '\ngenerator!')
    );

    const prompts = [
      {
        name: 'packageName',
        message: 'Plugin name:',
        default: path.basename(process.cwd()),
        filter: (str) => kebabCase(str),
        validate: (str) => str.length > 0
      },
      {
        name: 'description',
        message: 'Plugin description (optional):',
        type: 'input',
        default: ''
      },
      {
        name: 'initGit',
        message: 'Initialize git repo?',
        type: 'confirm',
        default: true
      },
      {
        name: 'author',
        message: 'What\'s your name?',
        type: 'input',
        default: this.user.git.name()
      }
    ];

    return this.prompt(prompts).then((props: any) => {
      this.props = props;
    });
  }

  public default() {
    const packageName = this.props.packageName;
    const description = this.props.description;
    const author = this.props.author;
    if (this.options['same-directory'] === true) {
      this.log('Generating in current directory.');
    } else {
      utils.handleDir(this, packageName);
    }

    this.composeWith(require.resolve('../plugin'), { name: packageName, description, author });

    this.composeWith(
      require.resolve('generator-license/app'),
      {
        name: author,
        defaultLicense: 'Apache-2.0',
        output: 'LICENSE.txt'
      }
    );
  }

  public install() {
    if (this.props.initGit) {
      utils.gitInit(this, `Initial commit on ${this.props.packageName} TinyMCE plugin.`);
    }

    this.installDependencies({
      bower: false,
      yarn: true,
      npm: false
    });
  }
};

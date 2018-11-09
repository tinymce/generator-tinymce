"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
const lodash_1 = require("lodash");
const utils = require("../utils");
module.exports = class Package extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.option('name', {
            type: String,
            description: 'Name of the package'
        });
    }
    initializing() {
        const name = this.options.name;
        const camelName = lodash_1.camelCase(name);
        const ch = utils.copyHelper(this);
        ch('README.md', 'README.md', { name, camelName });
    }
};

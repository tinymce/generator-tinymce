"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const mkdirp = require("mkdirp");
const chalk_1 = require("chalk");
exports.handleDir = (ctx, name) => {
    if (path.basename(ctx.destinationPath()) !== name) {
        ctx.log('\n' +
            chalk_1.default.green('!') + ' Your plugin must be inside a directory \n' +
            chalk_1.default.green('!') + ' with the same name as the plugin: ' + chalk_1.default.blue(name) + '\n' +
            chalk_1.default.green('!') + ' I\'ll automatically create this directory for you.\n');
        mkdirp(name);
        ctx.destinationRoot(ctx.destinationPath(name));
    }
};
exports.copyHelper = (ctx) => (from, dest, opts) => {
    opts = opts === undefined ? {} : opts;
    ctx.fs.copyTpl(ctx.templatePath(from), ctx.destinationPath(dest), opts);
};
exports.gitInit = (ctx, message = 'Initial commit.') => {
    ctx.spawnCommandSync('git', ['init', '--quiet']);
    ctx.spawnCommandSync('git', ['add', '--all']);
    ctx.spawnCommandSync('git', ['commit', '-m', message, '--quiet']);
    ctx.log('\n' +
        chalk_1.default.green('success') + ' Created git repository!' +
        '\n');
};

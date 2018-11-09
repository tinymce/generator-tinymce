"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = require("./plugin");
tinymce.PluginManager.add("<%= camelName %>", plugin_1.default);

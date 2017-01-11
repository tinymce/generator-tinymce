import plugin from "./plugin";

declare var tinymce: any;

tinymce.PluginManager.add("<%= camelName %>", plugin);

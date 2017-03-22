process.env.NODE_PATH = __dirname + '/src';
require('module').Module._initPaths();
require('require-dir')('tasks', {recurse: true});

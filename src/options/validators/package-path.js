const _ = require('restutils-helpers-js');
const path = require('path');

const packagePath = opts => {
  if (!_.isValidString(opts.path)) { return null; }
  if (!_.isFile(opts.path) && !_.isDirectory(opts.path)) {
    return 'Package path is invalid.';
  }
  if (_.isDirectory(opts.path) && !_.isFile(path.join(opts.path, 'package.json'))) {
    return 'Package file does not exist.';
  }
  return null;
};

module.exports = packagePath;

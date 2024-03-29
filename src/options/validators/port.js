const _ = require('restutils-helpers-js');

const packageName = opts => {
  if (!_.isValidString(opts.name)) { return null; }
  if (opts.name.includes('\\')) {
    return 'Package name is invalid.';
  } 
  return null;
};

module.exports = packageName;

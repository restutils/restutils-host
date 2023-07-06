const _ = require('restutils-helpers-js');

const envFile = opts => {
  if (!_.isSet(opts.env)) { return null; }

  return 'Environment files are not yet supported.';

  // if (_.isValidString(opts.env) && !_.isFile(opts.env)) {
  //   return 'Environment file does not exist.';
  // }
  // return null;
};

module.exports = envFile;

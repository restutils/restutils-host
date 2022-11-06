const _ = require('restutils-helpers');

const packageNameOrPath = opts => {

  const values = [opts.path, opts.repo, opts.name].filter(_.isValidString);

  if (values.length === 0) {
    return 'Package name, repo, or path must be supplied.';
  }
  if (values.length > 1) {
    return 'Only one of package name, repo, or path may be supplied.';
  }

  return null;
};

module.exports = packageNameOrPath;

const _ = require('restutils-helpers-js');

const packageRepo = opts => {
  if (!_.isValidString(opts.repo)) { return null; }
  if (!opts.repo.includes('/')) {
    return 'Repo path does not appear to be valid.';
  }
  return null;
};

module.exports = packageRepo;

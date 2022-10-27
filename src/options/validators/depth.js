const _ = require('../../utils');

const depth = opts => {
  if (!_.isSet(opts.depth)) { return null; }

  if (!_.isNumber(opts.depth)) {
    return 'Depth setting must be an integer.';
  }
  if (Number(opts.depth) < 1) {
    return 'Depth setting must be at least 1.';
  }

  return null;
};

module.exports = depth;

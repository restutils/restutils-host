const _ = require('restutils-helpers-js');

const DELIMETERS = '_-';
const EMPTY_OKAY = false;

const basePath = opts => {
  if (!_.isValidString(opts.base)) { return null; }

  const base = _.removePrefix(_.removeSuffix(opts.base, '/'), '/');

  const parts = base.split('/').filter(x => (_.isValidString(x, EMPTY_OKAY)));
  
  for (let i = 0; i < parts.length; i += 1) {
    parts[i] = parts[i]
      .split('')
      .filter(ch => (DELIMETERS.includes(ch) || _.isAlphanumeric(ch)))
      .join('');
  }

  if (base !== parts.join('/')) {
    return 'Base path contains invalid characters.';
  } 
  return null;
};

module.exports = basePath;

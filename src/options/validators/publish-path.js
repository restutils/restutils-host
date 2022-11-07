const _ = require('restutils-helpers');

const PREFIX = '.';
const DELIMS = '_-';
const CHARS  = 'abcdefghijklmnopqrstuvwxyz0123456789';
const VALID_CHARS = `${PREFIX}${DELIMS}${CHARS}`;

const publishDefinition = opts => {

  if (!_.isValidString(opts.publish)) { 
    return null; 
  }

  let clean = opts.publish
    .split('')
    .filter(ch => (VALID_CHARS.includes(ch.toLowerCase())))
    .join('');

  if (clean !== opts.publish) {
    return 'Publish route contains illegal characters.';
  }
  if (clean.startsWith(PREFIX) && clean.length > PREFIX.length) {
    clean = clean.substr(PREFIX.length);
  }
  if (!CHARS.includes(clean.substr(0, 1).toLowerCase())) {
    return 'Publish route must begin with an alphanumeric character or single dot.';
  }

  return null;
};

module.exports = publishDefinition;

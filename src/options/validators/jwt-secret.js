const _ = require('restutils-helpers-js');

const jwt = opts => {
  if (!_.isValidString(opts.jwtSecret)) { return null; }

  const keys = [
    opts.jwtParam,
    opts.jwtCookie,
    opts.jwtHeader
  ].filter(x => (x && _.isValidString(x)));

  return (keys.length === 0)
    ? 'JWT param, cookie, or header name must be specified when a secret is set.'
    : null;
};

module.exports = jwt;

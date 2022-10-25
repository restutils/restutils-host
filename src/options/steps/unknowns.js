const def = require('../definition');

const IGNORE = ['root'];

const unknownsCheck = opts => {

  return Object.keys(opts)
    .filter(x => (!IGNORE.includes(x)))
    .filter(key => (typeof def[key] === 'undefined'))
    .map(key => (`Unkown option supplied: ${key}`));

};

module.exports = unknownsCheck;

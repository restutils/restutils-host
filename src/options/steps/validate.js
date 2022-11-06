const _ = require('restutils-helpers');
const validators = require('../validators');

const validate = opts => {
  return Object.keys(validators)
    .map(key => (validators[key](opts)))
    .filter(_.isValidString);
};

module.exports = validate;

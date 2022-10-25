const { isValidString } = require('./is-valid-string');

const removeSuffix = (value, suffix) => {
  if (!isValidString(value, true)) { return value; }
  if (!isValidString(suffix, true)) { return value; }
  while (value.length >= suffix.length && value.endsWith(suffix)) {
    value = value.substr(0, value.length - suffix.length);
  }
  return value;
};

module.exports = removeSuffix;

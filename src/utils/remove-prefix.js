const { isValidString } = require('./is-valid-string');

const removePrefix = (value, prefix) => {
  if (!isValidString(value, true)) { return value; }
  if (!isValidString(prefix, true)) { return value; }
  while (value.length >= prefix.length && value.startsWith(prefix)) {
    if (value === prefix) { 
      value = ''; 
    }
    else {
      value = value.substr(prefix.length);    
    }
  }
  return value;
};

module.exports = removePrefix;

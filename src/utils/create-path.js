const fs = require('fs');
const isFolder = require('./is-folder');
const { isValidString } = require('./is-valid-string');

const createPath = value => {
  if (!isValidString(value)) { return false; }
  if (isFolder(value)) { return true; }
  try {
    fs.mkdirSync(value, {
      recursive: true
    });
  } catch (ex) {
    console.error(ex);
  }
  return isFolder(value);
};

module.exports = createPath;

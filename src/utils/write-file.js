const fs       = require('fs');
const path     = require('path');
const makePath = require('./make-path');
const isFile   = require('./is-file');

const writeFile = (filePath, contents = '') => {

  if (!makePath(path.dirname(filePath))) {
    return false;
  }

  try {
    fs.writeFileSync(filePath, String(contents));
  } catch (ex) {
    return false;
  }

  return isFile(filePath);
};

module.exports = writeFile;

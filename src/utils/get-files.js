const fs            = require('fs');
const path          = require('path');
const isDirectory   = require('./is-directory');
const { isValidString } = require('./is-valid-string');

const getFiles = folderPath => {
  if (!isDirectory(folderPath)) { return null; }
  try {
    const names = fs.readdirSync(folderPath);
    return [].concat(names)
      .filter(isValidString)
      .map(name => (path.join(folderPath, name)));
  } catch (ex) {
    return null;
  }
};

module.exports = getFiles;

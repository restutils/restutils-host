const fs = require('fs');

const isFolder = filePath => {
  try {
    return fs.lstatSync(filePath).isDirectory();
  } catch (e) {
    return false;
  }
};

module.exports = isFolder;

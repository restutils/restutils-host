const rimraf      = require('rimraf');
const isDirectory = require('./is-directory');

const deleteDirectory = (folderPath) => {
  if (!isDirectory(folderPath)) {
    return true;
  }
  try {
    rimraf.sync(folderPath);
    return (!isDirectory(folderPath));
  } catch (ex) {
    console.debug(ex);
    return (!isDirectory(folderPath));
  }
};

module.exports = deleteDirectory;

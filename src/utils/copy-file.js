const fs = require('fs');

const copyFile = (sourcePath, targetPath) => {
  try {
    fs.copyFileSync(sourcePath, targetPath);
  } catch (e) {
    return false;
  }
  return true;
};

module.exports = copyFile;

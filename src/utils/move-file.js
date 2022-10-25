const fs = require('fs');
const path = require('path');
const isFile = require('./is-file');
const deleteFile = require('./delete-file');
const makePath = require('./make-path');

const rename = (sourcePath, destinationPath) => {
  try {
    fs.renameSync(sourcePath, destinationPath);
  } catch (ex) {
    return false;
  }
  return isFile(destinationPath);
};

const moveFile = (sourcePath, destinationPath) => {
  
  if (!makePath(path.dirname(destinationPath))) { return false; }

  if (rename(sourcePath, destinationPath)) {
    return true;
  }
  
  try {
    fs.copyFileSync(sourcePath, destinationPath);
  } catch (ex) {
    return false;
  }
  
  if (!isFile(destinationPath)) { return false; }
  return deleteFile(sourcePath);
};

module.exports = moveFile;

const _    = require('../../utils');
const path = require('path');

const getMainFilePath = libraryPath => {
  try {
    const pkg = require(libraryPath);
    if (!pkg || !pkg.main) {
      return null;
    }
    const mainPath = path.resolve(libraryPath, '..', pkg.main);
    return _.isFile(mainPath) ? mainPath : null;
  } catch (ex) {
    console.debug(ex);
    return null;
  }
}

const getMainFromPackage = pkg => (
  path.resolve(
    path.dirname(pkg.path), pkg.data.main))

const loadLibrary = opts => {

  if (!_.isSet(opts.path)) {
    return [];
  }

  const errors      = [];
  let   libraryPath = null;

  if (_.isFile(opts.path)) {
    libraryPath = opts.path;
  } else if (opts.pkg) {
    libraryPath = getMainFromPackage(opts.pkg);
  } else if (_.isDirectory(opts.path)) {

    const pkgFile  = path.join(opts.path, 'package.json');
    if (!_.isFile(pkgFile)) {
      return 'Missing package file.'
    }

    const mainFile = getMainFilePath(pkgFile);
    if (!mainFile) {
      return 'Main entry file could not be determined.'
    }
    if (!_.isFile(mainFile)) {
      return 'Main entry file is missing.'
    }
    libraryPath = mainFile;
  }



  // if (_.isFile(opts.path)) {
  //   libraryPath = opts.path;
  // } else if (_.isDirectory(opts.path)) {




    

  // }

  if (!libraryPath.toLowerCase().endsWith('.js')) {
    errors.push('Library file must be JavaScript.');
  }
  if (!_.isFile(libraryPath)) {
    errors.push('Library file does not exist.');
  }

  try {
    opts.library = require(libraryPath)
  } catch (ex) {
    console.debug(ex);
    errors.push('Exception while loading library file.');
  }

  if (!_.isObject(opts.library)) {
    errors.push('Library file not loaded.')
  }

  return errors;
};

module.exports = loadLibrary;

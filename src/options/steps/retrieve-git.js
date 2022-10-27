const download = require('download-git-repo');
const path     = require('path');
const _        = require('../../utils');

const WORK_FOLDER = 'work';

const getPackage = async(workPath) => {

  const pkgPath = path.join(workPath, 'package.json');
  if (!_.isFile(pkgPath)) {
    return null;
  }

  const pkgData = _.getFileContents(pkgPath);
  const pkg     = _.parseJson(pkgData);

  if (!pkg || !pkg.name) {
    return null;
  }

  return {
    path: pkgPath,
    data: pkg
  };
}

const cloneRepo = (workPath, url) => {

  if (url.toLowerCase().startsWith('http')) {
    url = `direct:${url}`
  }

  // `direct:${url}`
  return new Promise((resolve, reject) => {
    download(url, workPath, { clone: true }, function (err) {
      resolve({
        err
      })
    });
  });
}



const retrieveGit = async (opts) => {

  if (!_.isSet(opts.repo)) {
    return [];
  }

  const urlHash  = _.getHash(opts.repo);
  const workPath = path.join(opts.root, WORK_FOLDER, urlHash);

  if (!_.createPath(path.dirname(workPath))) {
    return null;
  }

  let files = _.getFiles(workPath) || [];

  if (files.length === 0) {

    try {
      const result = await cloneRepo(workPath, opts.repo);
      if (result.err) {
        console.debug(result.err);
      }
      files = _.getFiles(workPath) || [];
    } catch (ex) {
      console.debug(ex);
      return null;
    }
      
  }

  if (files.length === 0) {
    _.deleteDirectory(workPath)
    return ['Failure retrieving repo.']
  }

  const pkg = await getPackage(workPath);
  if (!pkg) {
    _.deleteDirectory(workPath)
    return ['Repo is not a valid NPM library.']
  }

  // Set path for the loadLibrary call
  opts.pkg  = { ...pkg };
  opts.path = workPath;

  return [];
};

module.exports = retrieveGit;

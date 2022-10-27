const _    = require('../../utils');
const proc = require('child_process');
const path = require('path');

const install = (folderPath) => {
  return new Promise((resolve, reject) => {
    proc.exec(`cd ${folderPath} && npm i --silent`, (err, stdOut, stdErr) => {
      resolve({
        err,
        stdOut,
        stdErr
      });
    });
  });
};

const installDependencies = async (opts) => {

  if (!opts.path || opts.install === false) {
    return [];
  }

  const workDir = opts.path.endsWith('.js') 
    ? path.dirname(opts.path) 
    : _.isDirectory(opts.path)
      ? opts.path
      : null;

  if (_.isDirectory(path.join(workDir, 'node_modules'))) {
    return [];
  }

  if (!_.isDirectory(workDir) || !_.isFile(path.join(workDir, 'package.json'))) {
    return [];
  }
  if (_.isDirectory(path.join(workDir, 'node_modules'))) {
    return [];
  }

  await install(opts.path);

  if (!_.isDirectory(path.join(opts.path, 'node_modules'))) {
    return ['Dependencies not installed.'];
  }

  return [];
};

module.exports = installDependencies;

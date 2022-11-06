const path = require('path');
const proc = require('child_process');
const _    = require('restutils-helpers');

const WORK_FOLDER = 'work';

const initProject = (workPath) => {

  if (workPath.endsWith('latest') && !_.deleteDirectory(workPath)) {
    return false;
  }

  const pkgPath = path.join(workPath, 'package.json');
  
  if (_.isFile(pkgPath)) {
    return true;
  }
  
  const now = _.getBlockDate();
  const pkg = {
    name       : now,
    version    : '0.0.0',
    description: `Temporary work area created ${now}`,
    main       : 'index.js',
    scripts    : {
      test: 'echo \"No test script.\"'
    },
    keywords: [],
    author  : '',
    license : 'UNLICENSED'
  };
  return _.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
};
const install = (workPath, name, version) => {
  return new Promise((resolve, reject) => {
    proc.exec(`cd ${workPath} && npm i --silent ${name}@'${version}'`, (err, stdOut, stdErr) => {
      resolve({
        err,
        stdOut,
        stdErr
      });
    });
  });
};
const getPackage = async(workPath, name, version) => {

  await install(workPath, name, version);

  const pkgPath = path.join(workPath, 'node_modules', name, 'package.json');
  if (!_.isFile(pkgPath)) {
    console.debug('No package:', name, version);
    _.deleteDirectory(workPath);
    return null;
  }

  const pkgData = _.getFileContents(pkgPath);
  const pkg     = _.parseJson(pkgData);

  if (!pkg || !pkg.name) {
    console.debug('Invalid package:', name, version);
    _.deleteDirectory(workPath);
    return null;
  }

  return {
    path: pkgPath,
    data: pkg
  };
};

const toName = name => {
  let result = _.removePrefix(name, '@');
      result = _.removeSuffix(result, '@');
      result = result.split('@');
      result = {
        name   : `${name.startsWith('@') ? '@' : ''}${result[0]}`,
        version: (result.length === 2) ? (result[1] || 'latest') : 'latest'
      };
  return result;
};

const retrieveNpm = async (opts) => {

  if (!_.isSet(opts.name)) {
    return [];
  }

  const pkgName  = toName(opts.name);
  const workPath = path.join(opts.root, WORK_FOLDER, pkgName.name, pkgName.version);

  if (!initProject(workPath)) {
    return ['Failure initializing work project.'];
  }

  const pkg = await getPackage(workPath, pkgName.name, pkgName.version); 
  if (!pkg) {
    return ['Failure installing package.'];
  }

  // Set path for the loadLibrary call
  opts.pkg  = pkg;
  opts.path = workPath;

  return [];
};

module.exports = retrieveNpm;

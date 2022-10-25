const cleanPaths    = require('./clean-paths');
const setDefaults   = require('./set-defaults');
const unknowns      = require('./unknowns');
const validate      = require('./validate');
const verifyFormats = require('./verify-formats');
const retrieveGit   = require('./retrieve-git');
const retrieveNpm   = require('./retrieve-npm');
const installDeps   = require('./install-deps');
const loadLibrary   = require('./load-library');
const buildRouter   = require('./build-router');

module.exports = {
  cleanPaths,
  setDefaults,
  unknowns,
  validate,
  verifyFormats,
  retrieveGit,
  retrieveNpm,
  installDeps,
  loadLibrary,
  buildRouter
};

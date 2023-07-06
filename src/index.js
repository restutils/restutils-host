const path       = require('path');
const _          = require('restutils-helpers-js');
const options    = require('./options');
const processing = require('./processing');

module.exports.processOptions = async (opts) => {

  let errors = [];

  opts.root =  path.dirname(__dirname);

  errors = _.isValidArray(errors) ? errors : options.steps.unknowns(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.cleanPaths(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.setDefaults(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.verifyFormats(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.validate(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.retrieveGit(opts);
  errors = _.isValidArray(errors) ? errors : await options.steps.retrieveGit(opts);
  errors = _.isValidArray(errors) ? errors : await options.steps.retrieveNpm(opts);
  errors = _.isValidArray(errors) ? errors : await options.steps.installDeps(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.loadLibrary(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.buildRouter(opts);

  errors = _.isValidArray(errors) ? errors : processing.startServer(opts);

  errors = _.unique(errors);

  return {
    errors,
    files : opts._files
  };
};

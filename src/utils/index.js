const constants       = require('./constants');
const copyContents    = require('./copy-contents');
const copyFile        = require('./copy-file');
const createPath      = require('./create-path');
const deleteDirectory = require('./delete-directory');
const deleteFile      = require('./delete-file');
const getBlockDate    = require('./get-blockdate');
const getCommonPath   = require('./get-common-path');
const getDuration     = require('./get-duration');
const getFileContents = require('./get-file-contents');
const getFileSize     = require('./get-file-size');
const getFiles        = require('./get-files');
const getHash         = require('./get-hash');
const getPads         = require('./get-pads');
const getSubstring    = require('./get-substring');
const isAlpha         = require('./is-alpha');
const isAlphanumeric  = require('./is-alphanumeric');
const isAsync         = require('./is-async');
const isBoolean       = require('./is-boolean');
const isDefined       = require('./is-defined');
const isDigits        = require('./is-digits');
const isDirectory     = require('./is-directory');
const isFile          = require('./is-file');
const isFolder        = require('./is-folder');
const isFunction      = require('./is-function');
const isMatch         = require('./is-match');
const isNumber        = require('./is-number');
const isObject        = require('./is-object');
const isSet           = require('./is-set');
const isValidArray    = require('./is-valid-array');
const isValidPath     = require('./is-valid-path');
const isValidString   = require('./is-valid-string');
const makePath        = require('./make-path');
const moveFile        = require('./move-file');
const parseJson       = require('./parse-json');
const print           = require('./print');
const readLines       = require('./read-lines');
const removePrefix    = require('./remove-prefix');
const removeSuffix    = require('./remove-suffix');
const toKebabCase     = require('./to-kebab-case');
const toSnakeCase     = require('./to-snake-case');
const toTable         = require('./to-table');
const trimArray       = require('./trim-array').trim;
const unique          = require('./unique');
const writeFile       = require('./write-file');

module.exports = {
  constants,
  copyContents,
  copyFile,
  createPath,
  deleteDirectory,
  deleteFile,
  getBlockDate,
  getCommonPath,
  getDuration,
  getFileContents,
  getFileSize,
  getFiles,
  getHash,
  getPads,
  getSubstring,
  isAlpha,
  isAlphanumeric,
  isAsync,
  ...isBoolean,
  isDefined,
  isDigits,
  isDirectory,
  isFile,
  isFolder,
  isFunction,
  isMatch,
  isNumber,
  isObject,
  isSet,
  ...isValidArray,
  ...isValidPath,
  ...isValidString,
  makePath,
  moveFile,
  parseJson,
  print,
  readLines,
  removePrefix,
  removeSuffix,
  toKebabCase,
  toSnakeCase,
  toTable,
  trimArray,
  unique,
  writeFile
};

const _ = require('restutils-helpers-js');
const c = require('./constants');

const { BOOLEAN, NUMBER, STRING, ARRAY, PATH, FUNCTION } = c.OPTION_TYPE;

module.exports = {

  name   : { type: STRING,  name: 'Package name in npmjs.org',      default: null },
  path   : { type: PATH,    name: 'Full path to local package',     default: null },
  env    : { type: PATH,    name: 'Full path to environment file',  default: null },
  repo   : { type: STRING,  name: 'URL to hosted Git repo',         default: null },
  depth  : { type: NUMBER,  name: 'Maximum levels to recurse',      default: null },
  base   : { type: STRING,  name: 'Base path of listener',          default: '' },
  publish: { type: STRING,  name: 'Route to publish definition.',   default: '.restutils' },
  caps   : { type: BOOLEAN, name: 'Allow all-caps for names.',      default: true },
  cors   : { type: STRING,  name: 'Allowed CORS origin',            default: '' },
  port   : { type: NUMBER,  name: 'Port for incoming requests',     default: '3000' },
  install: { type: BOOLEAN, name: 'Install dependencies if needed', default: true },

  jwtSecret   : { type: STRING,  name: 'Validate JWT if set',       default: '' },
  jwtCookie   : { type: STRING,  name: 'JWT cookie name',           default: 'token' },
  jwtHeader   : { type: STRING,  name: 'JWT header name',           default: 'authorization' },
  jwtParam    : { type: STRING,  name: 'JWT query param name',      default: 'jwt' },
  jwtExpired  : { type: BOOLEAN, name: 'Expired JWT allowed',       default: false },
  jwtInvalid  : { type: BOOLEAN, name: 'Invalid JWT allowed',       default: false },

  // target      : { type: PATH, name: 'Desination Directory' },

  // recursive   : { type: BOOLEAN, default: true, name: 'Locate files recursively' },
  // overwrite   : { type: BOOLEAN, default: false, name: 'Overwrite existing target files' },
  // ignore      : { type: BOOLEAN, default: false, name: 'Ignore existing target files' },
  // copy        : { type: BOOLEAN, default: false, name: 'Copy the files' },
  // move        : { type: BOOLEAN, default: false, name: 'Move the files' },

  // useName     : { type: BOOLEAN, default: false, name: 'Extract date from file name' },
  // useCreated  : { type: BOOLEAN, default: false, name: 'Use created date for target folder name' },
  // useModified : { type: BOOLEAN, default: false, name: 'Use modified date for target folder name' },

  // addType     : { type: BOOLEAN, default: false, name: 'Target folder name includes file type' },
  // addYear     : { type: BOOLEAN, default: true, name: 'Target folder name includes file year' },
  // addMonth    : { type: BOOLEAN, default: true, name: 'Target folder name includes file month' },
  // addDay      : { type: BOOLEAN, default: true, name: 'Target folder name includes file day' },
  // addHour     : { type: BOOLEAN, default: false, name: 'Target folder name includes file hour' },
  // addMinute   : { type: BOOLEAN, default: false, name: 'Target folder name includes file minute' },
  // addSecond   : { type: BOOLEAN, default: false, name: 'Target folder name includes file second' },

  // console     : { type: BOOLEAN, default: false, name: 'Log activity to console' },

  // limit       : { type: 'number', default: -1, name: 'Number of files to process' },
  // allowFuture : { type: BOOLEAN, default: false, name: 'Allow file names with date in future' },
};

const _             = require('restutils-helpers-js');
const cors          = require('cors');
const express       = require('express');
const cookieParser  = require('cookie-parser');
const path          = require('path');
const pkg           = require('../../package.json');

const TITLE = 'RESTUtils Host';

const getDisplayName = opts => {
  if (opts.repo) {
    return `REPO : ${opts.repo}`;
  } if (opts.pkg) {
    return `PACKAGE : ${opts.pkg.data.name} v${opts.pkg.data.version}`;
  } if (opts.path) {
    const fileName = path.basename(opts.path);
    const dirName = path.basename(path.dirname(opts.path));
    return `FILE : ${[dirName, fileName].join('/')}`;
  } 
    return `${TITLE} v${pkg.version}`;
  
};

const startServer = (opts) => {

  const app = express();

  const corsOrigins = [].concat(opts.cors).filter(x => (x && _.isValidString(x)));
  if (corsOrigins.length > 0) {
    app.use(cors({
      origin              : corsOrigins,
      methods             : "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue   : true,
      optionsSuccessStatus: 204,
      credentials         : true
    }));
  }

  const jsonOptions = { extended: false };
  if (opts.limit) {
    // app.use(express.json({ limit: '50mb' }));
    jsonOptions.limit = opts.limit;
  }
  app.use(express.json(jsonOptions));

  if (_.isValidString(opts.jwtCookie) && _.isValidString(opts.jwtSecret)) {
    app.use(cookieParser());
  }

  const jsonOptionsExtended = { extended: false };
  if (opts.limit) {
    // app.use(express.urlencoded({ limit: '50mb', extended: false }));
    jsonOptionsExtended.limit = opts.limit;
  }
  app.use(express.urlencoded(jsonOptionsExtended));

  app.use(opts.router);
  
  // const NODE_ENV  = process.env.NODE_ENV || '';
  // const NODE_NOTE = process.env.NODE_NOTE || '';
  // const NODE_TEST = process.env.NODE_TEST || '(not set)';

  app.listen(opts.port, (err) => {
    if (err) { throw err; }
    console.info(`${TITLE} v${pkg.version}`);
    console.info(`${getDisplayName(opts)}`);
    console.info(`PORT : ${opts.port}`);
    // console.info(`ENV : ${NODE_ENV}`);
    console.info(`BASE : ${opts.base || '(not set)'}`);
    console.info(`JWT  : ${_.isValidString(opts.jwtSecret) ? '(enabled)' : '(not enabed)'}`);
    // console.info(`TEST: ${NODE_TEST}`);
    // console.info(`NOTE: ${NODE_NOTE}`);

    opts.routes.forEach(route => {
      console.log(`${route.type.padEnd(5, ' ')}:`, route.url);
    });
  });
  
  return [];
};

module.exports = startServer;

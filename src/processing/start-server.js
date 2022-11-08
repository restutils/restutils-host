const _ = require('restutils-helpers')
const cors    = require('cors');
const express = require('express');
const path    = require('path');
const pkg     = require('../../package.json');

const TITLE = 'RESTUtils Host';

const getDisplayName = opts => {
  if (opts.repo) {
    return `REPO : ${opts.repo}`;
  } else if (opts.pkg) {
    return `PACKAGE : ${opts.pkg.data.name} v${opts.pkg.data.version}`;
  } else if (opts.path) {
    const fileName = path.basename(opts.path);
    const dirName = path.basename(path.dirname(opts.path));
    return `FILE : ${[dirName, fileName].join('/')}`;
  } else {
    return `${TITLE} v${pkg.version}`;
  }
}

const startServer = (opts) => {

  const app = express();

  if (opts.cors !== false) {
    app.use(cors());
  }

  const jsonOptions = { extended: false };
  if (opts.limit) {
    // app.use(express.json({ limit: '50mb' }));
    jsonOptions.limit = opts.limit;
  }
  app.use(express.json(jsonOptions));

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
    // console.info(`TEST: ${NODE_TEST}`);
    // console.info(`NOTE: ${NODE_NOTE}`);

    opts.routes.forEach(route => {
      console.log(`${route.type.padEnd(5, ' ')}:`, route.url);
    });
  });
  
  return [];
};

module.exports = startServer;

const cors    = require('cors');
const express = require('express');
const pkg     = require('../../package.json');

const startServer = (opts) => {

  const app = express();

  if (opts.cors !== false) {
    app.use(cors());
  }

  const jsonOpts = { extended: false };
  if (opts.limit) {
    // app.use(express.json({ limit: '50mb' }));
    jsonOpts.limit = opts.limit
  }
  app.use(express.json(jsonOpts));

  const jsonOptsExtended = { extended: false };
  if (opts.limit) {
    // app.use(express.urlencoded({ limit: '50mb', extended: false }));
    jsonOptions.limit = opts.limit
  }
  app.use(express.urlencoded(jsonOptsExtended));

  app.use(opts.router);
  
  // const NODE_ENV  = process.env.NODE_ENV || '';
  // const NODE_NOTE = process.env.NODE_NOTE || '';
  // const NODE_TEST = process.env.NODE_TEST || '(not set)';

  app.listen(opts.port, (err) => {
    if (err) { throw err; }
    console.info(`${pkg.description || pkg.name} v${pkg.version}`);
    console.info(`PORT : ${opts.port}`);
    // console.info(`ENV : ${NODE_ENV}`);
    console.info(`BASE : ${opts.base || '(not set)'}`);
    // console.info(`TEST: ${NODE_TEST}`);
    // console.info(`NOTE: ${NODE_NOTE}`);

    opts.routes.forEach(route => {
      console.log(`${route.type.padEnd(5, ' ')}:`, route.url)
    });
  });
  
  return [];
};

module.exports = startServer;

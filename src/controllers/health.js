const _   = require('cleaner-node');
const pkg = require('../package.json');

const { UNAUTHORIZED } = _.constants.http.status.codes;
const VALID_TEST_KEYS  = ['key', 'test'];

const ping = (req, res) => {
  res.json({
    name: pkg.name,
    desc: pkg.description,
    ver:  pkg.version,

    base: process.env.NODE_BASE,
    env:  process.env.NODE_ENV,
    port: process.env.NODE_PORT,

    date: (new Date()).toISOString()
  });
};

const status = async (req, res) => {
  const tests = {};

  res.json({
    name: pkg.name,
    desc: pkg.description,
    ver:  pkg.version,

    base: process.env.NODE_BASE,
    env:  process.env.NODE_ENV,
    port: process.env.NODE_PORT,

    date: (new Date()).toISOString(),

    tests,
    vars : _.vars.getAll()
  });
};

const test = async (req, res) => {
  const testValue = _.express.getValue(req, VALID_TEST_KEYS);
  if (process.env.NODE_TEST && testValue !== process.env.NODE_TEST) {
    return res.status(UNAUTHORIZED).json({ message: 'Invalid test key.' });
  }

  const tests = {};

  res.json({
    name: pkg.name,
    desc: pkg.description,
    ver:  pkg.version,

    base: process.env.NODE_BASE,
    env:  process.env.NODE_ENV,
    port: process.env.NODE_PORT,

    date: (new Date()).toISOString(),

    tests,
    vars : _.vars.getAll()
  });
};

module.exports = {
  ping,
  status,
  test
};

const _ = require('../../utils');
const def = require('../definition');

const toYargsFormat = () => {
  const result = {};
  Object.keys(def).forEach(key => {
    const param = def[key];
    result[`${_.toKebabCase(key)}`] = {
      describe: param.name,
      type: param.type.yargs
    };
  });
  return result;
};

module.exports = toYargsFormat;

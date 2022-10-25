const _ = require('../../utils');
const def = require('../definition');

const { BOOLEAN, NUMBER, STRING, ARRAY, PATH, FUNCTION } = _.constants.OPTION_TYPE;
const COL_DELIM = '~';

const toMarkdown = (forCli) => {

  const lines = [
    ['Name', 'Description', 'Type', 'Default'].join(COL_DELIM)
  ];

  Object.keys(def).forEach(key => {

    const opt  = def[key];
    const name = `\`${(forCli ? _.toKebabCase(key) : key)}\``;
    const desc = opt.name;
    // let type = '';
    // if (opt.type === 'boolean') {
    //   type = '`boolean`';
    // } else if (opt.type === 'number') {
    //   type = '`number`';
    // } else if (opt.isPath) {
    //   type = '`string (path)`';
    // } else if (opt.isArray) {
    //   type = '`string | string[]`';
    // } else if (opt === 'string') {
    //   type = '`string`';
    // }
    let defValue = '';
    switch (opt.type) {
      case BOOLEAN:
        defValue = (opt.default === true) ? 'true' : 'false';
        break;
      case NUMBER:
        defValue = (opt.default >= 0) ? `${opt.default}` : '';
        break;
      case STRING:
        defValue = opt.default ? `${opt.default}` : '';
        break;
      case FUNCTION:
        defValue = '(function)';
        break;
      default:
        defValue = '';
        break;
    }

    lines.push([
      name, 
      desc, 
      `\`${opt.type.display}\``, 
      (defValue ? `\`${defValue}\`` : '')
    ].join(COL_DELIM));
  });

  return _.toTable(lines, COL_DELIM);
};

module.exports = toMarkdown;

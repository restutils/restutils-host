const OPTION_TYPE = {
  BOOLEAN : { name: 'Boolean',  yargs: 'boolean',  display: 'boolean' },
  NUMBER  : { name: 'Number',   yargs: 'number',   display: 'number' },
  STRING  : { name: 'String',   yargs: 'string',   display: 'string' },
  ARRAY   : { name: 'Array',    yargs: 'string',   display: 'string | string[]' },
  PATH    : { name: 'Path',     yargs: 'string',   display: 'string (path)' },
  FUNCTION: { name: 'Function', yargs: 'function', display: '(function)' },
};

module.exports = {
  OPTION_TYPE
};

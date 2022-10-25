const isAsync = value => (
  typeof value === 'function' && 
  value.constructor.name === 'AsyncFunction'
);

module.exports = isAsync;

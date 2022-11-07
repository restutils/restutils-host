const _ = require('restutils-helpers');

const { BAD_REQUEST } = _.HTTP.STATUS.PHRASES;

const handler = req => {
  return _.errors.init(BAD_REQUEST, 100, 'Test Failure Message')
}

module.exports = {
  handler
};
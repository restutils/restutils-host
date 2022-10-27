const uuid  = require('uuid');

const EMPTY = '00000000-0000-0000-0000-000000000000'

const newUid = () => {
  return uuid.v4();
}

module.exports = {
  EMPTY,
  newUid
};
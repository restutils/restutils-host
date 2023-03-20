const _  = require('restutils-helpers');

const { BAD_REQUEST } = _.HTTP.STATUS.PHRASES;

const getUser = async (data) => {
  const { _session: session } = data;
  if (!session || !session.id) {
    return _.errors.message('No session.', { status: BAD_REQUEST.code });
  }
  return session
}

module.exports = getUser;
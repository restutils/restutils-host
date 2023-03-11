const _ = require('restutils-helpers');

const { BAD_REQUEST } = _.HTTP.STATUS.PHRASES;

const logout = async (data) => {

  const { _session: session } = data;
  if (!session) {
    return _.errors.message('No session.', { status: BAD_REQUEST.code });
  }

  return { logout: true }
}

module.exports = logout;
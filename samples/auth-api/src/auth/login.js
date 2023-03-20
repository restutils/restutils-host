const _  = require('restutils-helpers');

const { BAD_REQUEST } = _.HTTP.STATUS.PHRASES;

const login = async (data) => {

  const { _session: session } = data;
  if (session && session.id) {
    return _.errors.message('Already logged in.', { status: BAD_REQUEST.code });
  }

  if (!data.email || !data.password) {
    return _.errors.message('Email and password required.', { status: BAD_REQUEST.code });
  }

  const user = {
    id   : 12345,
    email: data.email,
    name : 'Joe Blow'
  };

  const claims = _.jwt.toClaims(user);
  const token  = _.jwt.encode(claims, process.env.JWT_SECRET);

  return { token, user }
}

module.exports = login;
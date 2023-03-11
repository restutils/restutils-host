const _  = require('restutils-helpers');

const { BAD_REQUEST } = _.HTTP.STATUS.PHRASES;

const signup = async (data) => {

  const { _session: session } = data;
  if (session) {
    return _.errors.message('Already logged in.', { status: BAD_REQUEST.code });
  }

  if (!data.email || !data.password || !data.name) {
    return _.errors.message('All fields are required.', { status: BAD_REQUEST.code });
  }

  const payload = {
    id   : 12345,
    email: data.email,
    name : data.name
  };

  const claims = _.jwt.toClaims(payload);
  const token  = _.jwt.encode(claims, process.env.JWT_SECRET);

  return { token }
}

module.exports = signup;
const crypto = require('crypto');

const getHash = value => crypto.createHash('md5').update(value).digest('hex');

module.exports = getHash;

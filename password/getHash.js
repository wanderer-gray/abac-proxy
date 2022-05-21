const crypto = require('crypto')

module.exports = (password, salt) =>
  crypto
    .pbkdf2Sync(password, salt, 1024, 64, 'sha512')
    .toString('hex')

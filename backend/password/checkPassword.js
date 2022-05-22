const getHash = require('./getHash')

module.exports = (password, salt, hash) => {
  const currHash = getHash(password, salt)

  return currHash === hash
}

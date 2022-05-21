const { checkPassword } = require('../password')

module.exports = async function (nickname, password, { log, knex, httpErrors }) {
  log.debug(`logIn: nickname=${nickname}; password=${password}`)

  const user = await knex('user')
    .where({ nickname })
    .first([
      'userId',
      'salt',
      'hash'
    ])

  if (!user) {
    throw httpErrors.notFound('Пользователь не найден')
  }

  const {
    userId,
    salt,
    hash
  } = user

  log.debug(`logIn: userId=${userId}; salt=${salt}; hash=${hash}`)

  if (!checkPassword(password, salt, hash)) {
    throw httpErrors.unauthorized('Пароль не совпадает')
  }

  return userId
}

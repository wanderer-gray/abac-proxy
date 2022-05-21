module.exports = async function (userId, { log, httpErrors }) {
  log.debug(`logOut: userId=${userId}`)

  if (!userId) {
    throw httpErrors.unauthorized('Вход в систему не разрешён')
  }
}

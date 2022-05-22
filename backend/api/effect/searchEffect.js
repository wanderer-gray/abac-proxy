module.exports = (name, app) => {
  const { log, knex } = app

  log.debug(`searchEffect: name=${name}`)

  return knex('effect')
    .where('name', 'like', `%${name}%`)
    .pluck('effectId')
}

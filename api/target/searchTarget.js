module.exports = (title, app) => {
  const { log, knex } = app

  log.debug(`searchTarget: title=${title}`)

  return knex('target')
    .where('title', 'like', `%${title}%`)
    .pluck('targetId')
}

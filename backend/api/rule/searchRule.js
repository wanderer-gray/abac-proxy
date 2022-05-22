module.exports = (title, app) => {
  const { log, knex } = app

  log.debug(`searchRule: title=${title}`)

  return knex('rule')
    .where('title', 'like', `%${title}%`)
    .pluck('ruleId')
}

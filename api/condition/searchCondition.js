module.exports = (title, app) => {
  const { log, knex } = app

  log.debug(`searchCondition: title=${title}`)

  return knex('condition')
    .where('title', 'like', `%${title}%`)
    .pluck('conditionId')
}

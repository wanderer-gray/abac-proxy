module.exports = (title, app) => {
  const { log, knex } = app

  log.debug(`searchPolicy: title=${title}`)

  return knex('policy')
    .where('title', 'like', `%${title}%`)
    .pluck('policyId')
}

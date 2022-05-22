module.exports = (title, app) => {
  const { log, knex } = app

  log.debug(`searchPolicySet: title=${title}`)

  return knex('policySet')
    .where('title', 'like', `%${title}%`)
    .pluck('policySetId')
}

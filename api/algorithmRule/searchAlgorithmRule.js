module.exports = (name, app) => {
  const { log, knex } = app

  log.debug(`searchAlgorithmRule: name=${name}`)

  return knex('algorithmRule')
    .where('name', 'like', `%${name}%`)
    .pluck('algorithmRuleId')
}

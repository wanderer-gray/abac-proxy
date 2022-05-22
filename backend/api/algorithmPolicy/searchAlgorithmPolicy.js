module.exports = (name, app) => {
  const { log, knex } = app

  log.debug(`searchAlgorithmPolicy: name=${name}`)

  return knex('algorithmPolicy')
    .where('name', 'like', `%${name}%`)
    .pluck('algorithmPolicyId')
}

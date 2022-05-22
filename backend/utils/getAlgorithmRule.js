module.exports = async (algorithmRuleId, app) => {
  const { log, knex, httpErrors } = app

  log.debug(`getAlgorithmRule: algorithmRuleId=${algorithmRuleId}`)

  const algorithmRule = await knex('algorithmRule')
    .where({ algorithmRuleId })
    .first(['name'])

  if (!algorithmRule) {
    log.warn(`getAlgorithmRule: algorithmRule not found "${algorithmRuleId}"`)

    throw httpErrors.notFound('Алгоритмы решения конфликтов для правил не найден')
  }

  const { name } = algorithmRule

  return {
    algorithmRuleId,
    name
  }
}

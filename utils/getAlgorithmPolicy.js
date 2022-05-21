module.exports = async (algorithmPolicyId, app) => {
  const { log, knex, httpErrors } = app

  log.debug(`getAlgorithmPolicy: algorithmPolicyId=${algorithmPolicyId}`)

  const algorithmPolicy = await knex('algorithmPolicy')
    .where({ algorithmPolicyId })
    .first(['name'])

  if (!algorithmPolicy) {
    log.warn(`getAlgorithmPolicy: algorithmPolicy not found "${algorithmPolicyId}"`)

    throw httpErrors.notFound('Алгоритмы решения конфликтов для политик не найден')
  }

  const { name } = algorithmPolicy

  return {
    algorithmPolicyId,
    name
  }
}

const assertNamespaceName = require('./assertNamespaceName')

module.exports = async (policyId, app) => {
  const { log, knex, httpErrors } = app

  log.debug(`getPolicy: policyId=${policyId}`)

  const policy = await knex('policy')
    .where({ policyId })
    .first([
      'title',
      'targetId',
      'algorithmRuleId',
      'namespaceName'
    ])

  if (!policy) {
    log.warn(`getPolicy: policy not found "${policyId}"`)

    throw httpErrors.notFound('Политика не найдена')
  }

  const {
    title,
    targetId,
    algorithmRuleId,
    namespaceName
  } = policy

  assertNamespaceName(namespaceName, app)

  return {
    policyId,
    title,
    targetId,
    algorithmRuleId,
    namespaceName
  }
}

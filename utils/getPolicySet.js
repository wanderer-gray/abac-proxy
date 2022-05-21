const assertNamespaceName = require('./assertNamespaceName')

module.exports = async (policySetId, app) => {
  const { log, knex, httpErrors } = app

  log.debug(`getPolicySet: policySetId=${policySetId}`)

  const policySet = await knex('policySet')
    .where({ policySetId })
    .first([
      'title',
      'targetId',
      'algorithmPolicyId',
      'namespaceName'
    ])

  if (!policySet) {
    log.warn(`getPolicySet: policySet not found "${policySetId}"`)

    throw httpErrors.notFound('Группа политик не найдена')
  }

  const {
    title,
    targetId,
    algorithmPolicyId,
    namespaceName
  } = policySet

  assertNamespaceName(namespaceName, app)

  return {
    policySetId,
    title,
    targetId,
    algorithmPolicyId,
    namespaceName
  }
}

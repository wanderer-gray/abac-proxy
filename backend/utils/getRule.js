const assertNamespaceName = require('./assertNamespaceName')

module.exports = async (ruleId, app) => {
  const { log, knex, httpErrors } = app

  log.debug(`getRule: ruleId=${ruleId}`)

  const rule = await knex('rule')
    .where({ ruleId })
    .first([
      'title',
      'effectId',
      'targetId',
      'conditionId',
      'namespaceName'
    ])

  if (!rule) {
    log.warn(`getRule: rule not found "${ruleId}"`)

    throw httpErrors.notFound('Правило не найдено')
  }

  const {
    title,
    effectId,
    targetId,
    conditionId,
    namespaceName
  } = rule

  assertNamespaceName(namespaceName, app)

  return {
    ruleId,
    title,
    effectId,
    targetId,
    conditionId,
    namespaceName
  }
}

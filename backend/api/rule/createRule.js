const getRule = require('./getRule')
const { assertNamespaceName } = require('../../utils')

module.exports = async function (ruleId, title, effectId, targetId, conditionId, namespaceName, app) {
  const { log, knex } = app

  log.debug(`createTarget: ruleId=${ruleId}; title=${title}; effectId=${effectId}; targetId=${targetId}; conditionId=${conditionId}; namespaceName=${namespaceName}`)

  assertNamespaceName(namespaceName, app)

  await knex('rule')
    .insert({
      ruleId,
      title,
      effectId,
      targetId,
      conditionId,
      namespaceName
    })

  return getRule(ruleId, app)
}

const getRule = require('./getRule')
const { assertNamespaceName } = require('../../utils')

module.exports = async function (ruleId, ruleData, app) {
  const { log, knex } = app

  log.debug(`updateRule: ruleId=${ruleId}; ruleData=${JSON.stringify(ruleData)}`)

  const { namespaceName } = ruleData

  assertNamespaceName(namespaceName, app)

  await knex('rule')
    .where({ ruleId })
    .update(ruleData)

  return getRule(ruleId, app)
}

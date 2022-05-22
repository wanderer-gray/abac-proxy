const getPolicy = require('./getPolicy')
const { assertNamespaceName } = require('../../utils')

module.exports = async function (policyId, title, targetId, algorithmRuleId, namespaceName, app) {
  const { log, knex } = app

  log.debug(`createPolicy: policyId=${policyId}; title=${title}; targetId=${targetId}; algorithmRuleId=${algorithmRuleId}; namespaceName=${namespaceName}`)

  assertNamespaceName(namespaceName, app)

  await knex('policy')
    .insert({
      policyId,
      title,
      targetId,
      algorithmRuleId,
      namespaceName
    })

  return getPolicy(policyId, app)
}

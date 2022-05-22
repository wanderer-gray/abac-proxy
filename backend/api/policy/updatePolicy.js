const getPolicy = require('./getPolicy')
const { assertNamespaceName } = require('../../utils')

module.exports = async function (policyId, policyData, app) {
  const { log, knex } = app

  log.debug(`updatePolicy: policyId=${policyId}; policyData=${JSON.stringify(policyData)}`)

  const { namespaceName } = policyData

  assertNamespaceName(namespaceName, app)

  await knex('policy')
    .where({ policyId })
    .update(policyData)

  return getPolicy(policyId, app)
}

const getPolicySet = require('./getPolicySet')
const { assertNamespaceName } = require('../../utils')

module.exports = async function (policySetId, policyData, app) {
  const { log, knex } = app

  log.debug(`updatePolicySet: policySetId=${policySetId}; policyData=${JSON.stringify(policyData)}`)

  const { namespaceName } = policyData

  assertNamespaceName(namespaceName, app)

  await knex('policySet')
    .where({ policySetId })
    .update(policyData)

  return getPolicySet(policySetId, app)
}

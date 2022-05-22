const getPolicySet = require('./getPolicySet')
const { assertNamespaceName } = require('../../utils')

module.exports = async function (policySetId, policySetData, app) {
  const { log, knex } = app

  log.debug(`updatePolicySet: policySetId=${policySetId}; policySetData=${JSON.stringify(policySetData)}`)

  const { namespaceName } = policySetData

  assertNamespaceName(namespaceName, app)

  await knex('policySet')
    .where({ policySetId })
    .update(policySetData)

  return getPolicySet(policySetId, app)
}

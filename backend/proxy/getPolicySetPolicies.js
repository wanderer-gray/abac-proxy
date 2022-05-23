const getPolicy = require('./getPolicy')
const { getPolicySetPolicies } = require('../utils')

module.exports = async (policySetId, app) => {
  const policies = await getPolicySetPolicies(policySetId, app)

  return Promise.all(
    policies.map(
      ({ policyId }) => getPolicy(policyId, app)
    )
  )
}

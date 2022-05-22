const getPolicy = require('./getPolicy')
const { getPolicies } = require('../utils')

module.exports = async (policySetId, app) => {
  const policies = await getPolicies(policySetId, app)

  return Promise.all(
    policies.map(
      (policyId) => getPolicy(policyId, app)
    )
  )
}

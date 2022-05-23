const { PolicySet } = require('abac-kernel')
const getTarget = require('./getTarget')
const getAlgorithmPolicy = require('./getAlgorithmPolicy')
const {
  getNamespace,
  getPolicySet
} = require('../utils')
const getPolicySetPolicies = require('./getPolicySetPolicies')

module.exports = async (policySetId, app) => {
  const policySetData = await getPolicySet(policySetId, app)

  const {
    targetId,
    algorithmPolicyId,
    namespaceName
  } = policySetData

  const [
    target,
    algorithm,
    namespace,
    policies
  ] = await Promise.all([
    getTarget(targetId, app),
    getAlgorithmPolicy(algorithmPolicyId, app),
    namespaceName ? getNamespace(namespaceName, app) : undefined,
    getPolicySetPolicies(policySetId, app)
  ])

  const policySet = PolicySet.new({
    name: policySetId,
    target,
    algorithm,
    namespace
  })

  policySet.addPolicies(policies)

  return policySet
}

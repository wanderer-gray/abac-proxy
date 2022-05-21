const { Policy } = require('abac-kernel')
const getTarget = require('./getTarget')
const getAlgorithmRule = require('./getAlgorithmRule')
const {
  getNamespace,
  getPolicy
} = require('../utils')
const getRules = require('./getRules')

module.exports = async (policyId, app) => {
  const policyData = await getPolicy(policyId, app)

  const {
    targetId,
    algorithmRuleId,
    namespaceName
  } = policyData

  const [
    target,
    algorithm,
    namespace,
    rules
  ] = await Promise.all([
    getTarget(targetId, app),
    getAlgorithmRule(algorithmRuleId, app),
    namespaceName ? getNamespace(namespaceName, app) : undefined,
    getRules(policyId, app)
  ])

  const policy = Policy.new({
    name: policyId,
    target,
    algorithm,
    namespace
  })

  policy.addRules(rules)

  return policy
}

const { Rule } = require('abac-kernel')
const getEffect = require('./getEffect')
const getTarget = require('./getTarget')
const getCondition = require('./getCondition')
const {
  getNamespace,
  getRule
} = require('../utils')

module.exports = async (ruleId, app) => {
  const rule = await getRule(ruleId, app)

  const {
    effectId,
    targetId,
    conditionId,
    namespaceName
  } = rule

  const [
    effect,
    target,
    condition,
    namespace
  ] = await Promise.all([
    getEffect(effectId, app),
    targetId ? getTarget(targetId, app) : undefined,
    getCondition(conditionId, app),
    namespaceName ? getNamespace(namespaceName, app) : undefined
  ])

  return Rule.new({
    name: ruleId,
    effect,
    target,
    condition,
    namespace
  })
}

const getRule = require('./getRule')
const { getRules } = require('../utils')

module.exports = async (policyId, app) => {
  const rules = await getRules(policyId, app)

  return Promise.all(
    rules.map(
      (ruleId) => getRule(ruleId, app)
    )
  )
}

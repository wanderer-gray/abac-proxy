const getRule = require('./getRule')
const { getPolicyRules } = require('../utils')

module.exports = async (policyId, app) => {
  const rules = await getPolicyRules(policyId, app)

  return Promise.all(
    rules.map(
      ({ ruleId }) => getRule(ruleId, app)
    )
  )
}

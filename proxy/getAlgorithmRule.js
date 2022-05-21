const { getAlgorithmRule } = require('../utils')

module.exports = async (algorithmRuleId, app) => {
  const algorithmRule = await getAlgorithmRule(algorithmRuleId, app)

  return algorithmRule.name
}

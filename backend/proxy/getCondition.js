const { Condition } = require('abac-kernel')
const { getCondition } = require('../utils')

module.exports = async (conditionId, app) => {
  const condition = await getCondition(conditionId, app)

  return Condition.new(condition)
}

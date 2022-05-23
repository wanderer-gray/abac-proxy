const { getCondition } = require('../../utils')

module.exports = async (conditionId, app) => {
  const condition = await getCondition(conditionId, app)

  delete condition.code

  return condition
}

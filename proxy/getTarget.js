const { Target } = require('abac-kernel')
const { getTarget } = require('../utils')

module.exports = async (targetId, app) => {
  const target = await getTarget(targetId, app)

  return Target.new(target)
}

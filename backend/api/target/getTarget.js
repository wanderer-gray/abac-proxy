const { getTarget } = require('../../utils')

module.exports = async (targetId, app) => {
  const target = await getTarget(targetId, app)

  delete target.code

  return target
}

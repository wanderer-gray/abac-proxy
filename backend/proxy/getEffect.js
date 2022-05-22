const getEffect = require('../utils')

module.exports = async (effectId, app) => {
  const effect = await getEffect(effectId, app)

  return effect.name
}

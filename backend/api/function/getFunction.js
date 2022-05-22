const { getFunction } = require('../../utils')

module.exports = (namespaceName, attributeName, app) => {
  const _function = getFunction(namespaceName, attributeName, app)

  const {
    name,
    argsSettings,
    resultSettings
  } = _function

  return {
    name,
    argsSettings,
    resultSettings
  }
}

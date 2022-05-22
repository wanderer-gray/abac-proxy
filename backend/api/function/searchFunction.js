const { getFunctions } = require('../../utils')

module.exports = (namespaceName, functionName, app) => {
  const functions = getFunctions(namespaceName, app)

  return functions
    .filter(({ name }) => !functionName || name.includes(functionName))
    .map(({ name }) => name)
}

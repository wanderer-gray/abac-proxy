const { getNamespace } = require('../../utils')

module.exports = (namespaceName, app) => {
  const namespace = getNamespace(namespaceName, app)

  const {
    name
  } = namespace

  return {
    name
  }
}

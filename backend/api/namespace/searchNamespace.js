const { getNamespaces } = require('../../utils')

module.exports = (namespaceName, app) => {
  const namespaces = getNamespaces(app)

  return namespaces
    .filter(({ name }) => !namespaceName || name.includes(namespaceName))
    .map(({ name }) => name)
}

const { getAttributes } = require('../../utils')

module.exports = (namespaceName, attributeName, app) => {
  const attributes = getAttributes(namespaceName, app)

  return attributes
    .filter(({ name }) => !attributeName || name.includes(attributeName))
    .map(({ name }) => name)
}

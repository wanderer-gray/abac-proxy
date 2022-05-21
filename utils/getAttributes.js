const getNamespace = require('./getNamespace')

module.exports = (namespaceName, app) => {
  const { log } = app

  log.debug(`getAttributes: namespaceName=${namespaceName}`)

  const namespace = getNamespace(namespaceName, app)

  return [...namespace.attributes.values()]
}

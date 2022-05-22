const getNamespace = require('./getNamespace')

module.exports = (namespaceName, app) => {
  const { log } = app

  log.debug(`getFunctions: namespaceName=${namespaceName}`)

  const namespace = getNamespace(namespaceName, app)

  return [...namespace.functions.values()]
}

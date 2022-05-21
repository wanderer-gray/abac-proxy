const getNamespace = require('./getNamespace')

module.exports = (namespaceName, attributeName, app) => {
  const { log, httpErrors } = app

  log.debug(`getAttribute: namespaceName=${namespaceName}; attributeName=${attributeName}`)

  const namespace = getNamespace(namespaceName, app)

  try {
    return namespace.getAttribute(attributeName)
  } catch {
    log.warn(`getAttribute: attribute not found "${attributeName}"`)

    throw httpErrors.notFound('Атрибут не найден')
  }
}

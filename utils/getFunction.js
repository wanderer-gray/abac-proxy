const getNamespace = require('./getNamespace')

module.exports = (namespaceName, functionName, app) => {
  const { log, httpErrors } = app

  log.debug(`getFunction: namespaceName=${namespaceName}; functionName=${functionName}`)

  const namespace = getNamespace(namespaceName, app)

  try {
    return namespace.getFunction(functionName)
  } catch {
    log.warn(`getFunction: function not found "${functionName}"`)

    throw httpErrors.notFound('Функция не найдена')
  }
}

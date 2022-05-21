module.exports = (namespaceName, app) => {
  const { log, namespaces, httpErrors } = app

  log.debug(`getNamespace: namespaceName=${namespaceName}`)

  try {
    return namespaces.get(namespaceName)
  } catch {
    log.warn(`getNamespace: namespace not found "${namespaceName}"`)

    throw httpErrors.notFound('Пространство имен не найдено')
  }
}

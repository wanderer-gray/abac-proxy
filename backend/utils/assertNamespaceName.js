module.exports = (namespaceName, app) => {
  const { namespaces, httpErrors } = app

  if (typeof namespaceName === 'string' && !namespaces.has(namespaceName)) {
    throw httpErrors.notFound('Пространство имен не найдено')
  }
}

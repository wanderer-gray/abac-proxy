module.exports = (app) => {
  const { namespaces } = app

  return [...namespaces.namespaces.values()]
}

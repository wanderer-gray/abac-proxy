const { getAttribute } = require('../../utils')

module.exports = (namespaceName, attributeName, app) => {
  const attribute = getAttribute(namespaceName, attributeName, app)

  const {
    name,
    path,
    schema,
    computer
  } = attribute

  return {
    name,
    path,
    schema,
    computer: !!computer
  }
}

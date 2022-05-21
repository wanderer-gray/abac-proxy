const fastifyPlugin = require('fastify-plugin')

class Namespaces {
  constructor () {
    this.namespaces = new Map()
  }

  has (name) {
    return this.namespaces.has(name)
  }

  get (name) {
    const namespace = this.namespaces.get(name)

    if (!namespace) {
      throw new Error(`Namespace not found: "${name}"`)
    }

    return namespace
  }

  add (namespace) {
    const namespaceName = namespace.name

    if (this.has(namespaceName)) {
      throw new Error(`Namespace exists: "${namespaceName}"`)
    }

    this.namespaces.set(namespace.name, namespace)

    return this
  }
}

module.exports = fastifyPlugin(async function (app) {
  const namespaces = new Namespaces()

  namespaces.add(require('./system'))

  app.decorate('namespaces', namespaces)
})

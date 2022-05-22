const { schemaNamespace } = require('../../schema')

const searchNamespace = require('./searchNamespace')
const getNamespace = require('./getNamespace')

module.exports = async function (app) {
  app.log.info('Mount "namespace"')

  app.get('/searchNamespace', {
    schema: {
      summary: 'Поиск пространств имен',
      description: 'Поиск пространств имен по названию: : name like "%namespaceName%"',
      tags: ['namespace'],
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          namespaceName: schemaNamespace.name
        }
      },
      response: {
        200: schemaNamespace.namespaces
      }
    }
  }, function (request) {
    app.log.trace('searchNamespace')

    const { namespaceName } = request.query

    return searchNamespace(namespaceName, app)
  })

  app.get('/getNamespace', {
    schema: {
      summary: 'Получение пространства имен',
      description: 'Получение пространства имен по имени',
      tags: ['namespace'],
      querystring: {
        type: 'object',
        required: ['namespaceName'],
        additionalProperties: false,
        properties: {
          namespaceName: schemaNamespace.name
        }
      },
      response: {
        200: schemaNamespace.namespace
      }
    }
  }, function (request) {
    app.log.trace('getNamespace')

    const { namespaceName } = request.query

    return getNamespace(namespaceName, app)
  })
}

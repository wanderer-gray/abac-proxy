const {
  schemaNamespace,
  schemaFunction
} = require('../../schema')

const searchFunction = require('./searchFunction')
const getFunction = require('./getFunction')

module.exports = async function (app) {
  app.log.info('Mount "function"')

  app.get('/searchFunction', {
    schema: {
      summary: 'Поиск функций',
      description: 'Поиск функций по названию: name like "%functionName%"',
      tags: ['function'],
      querystring: {
        type: 'object',
        required: ['namespaceName'],
        additionalProperties: false,
        properties: {
          namespaceName: schemaNamespace.name,
          functionName: schemaFunction.name
        }
      },
      response: {
        200: schemaFunction.functions
      }
    }
  }, function (request) {
    app.log.trace('searchFunction')

    const {
      namespaceName,
      functionName
    } = request.query

    return searchFunction(namespaceName, functionName, app)
  })

  app.get('/getFunction', {
    schema: {
      summary: 'Получение функции',
      description: 'Получение функции',
      tags: ['function'],
      querystring: {
        type: 'object',
        required: [
          'namespaceName',
          'functionName'
        ],
        additionalProperties: false,
        properties: {
          namespaceName: schemaNamespace.name,
          functionName: schemaFunction.name
        }
      },
      response: {
        200: schemaFunction.function
      }
    }
  }, function (request) {
    app.log.trace('getFunction')

    const {
      namespaceName,
      functionName
    } = request.query

    return getFunction(namespaceName, functionName, app)
  })
}

const {
  schemaNamespace,
  schemaAttribute
} = require('../../schema')

const searchAttribute = require('./searchAttribute')
const getAttribute = require('./getAttribute')

module.exports = async function (app) {
  app.log.info('Mount "attribute"')

  app.get('/searchAttribute', {
    schema: {
      summary: 'Поиск атрибутов',
      description: 'Поиск атрибутов по названию: name like "%attributeName%"',
      tags: ['attribute'],
      querystring: {
        type: 'object',
        required: ['namespaceName'],
        additionalProperties: false,
        properties: {
          namespaceName: schemaNamespace.name,
          attributeName: schemaAttribute.name
        }
      },
      response: {
        200: schemaAttribute.attributes
      }
    }
  }, function (request) {
    app.log.trace('searchAttribute')

    const {
      namespaceName,
      attributeName
    } = request.query

    return searchAttribute(namespaceName, attributeName, app)
  })

  app.get('/getAttribute', {
    schema: {
      summary: 'Получение атрибута',
      description: 'Получение атрибута',
      tags: ['attribute'],
      querystring: {
        type: 'object',
        required: [
          'namespaceName',
          'attributeName'
        ],
        additionalProperties: false,
        properties: {
          namespaceName: schemaNamespace.name,
          attributeName: schemaAttribute.name
        }
      },
      response: {
        200: schemaAttribute.attribute
      }
    }
  }, function (request) {
    app.log.trace('getAttribute')

    const {
      namespaceName,
      attributeName
    } = request.query

    return getAttribute(namespaceName, attributeName, app)
  })
}

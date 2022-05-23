const { schemaCondition } = require('../../schema')

const searchCondition = require('./searchCondition')
const getCondition = require('./getCondition')
const createCondition = require('./createCondition')
const updateCondition = require('./updateCondition')
const deleteCondition = require('./deleteCondition')

module.exports = async function (app) {
  app.log.info('Mount "condition"')

  app.get('/searchCondition', {
    schema: {
      summary: 'Поиск условий',
      description: 'Поиск условий по названию: title like "%conditionTitle%"',
      tags: ['condition'],
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          title: schemaCondition.titleSearch
        }
      },
      response: {
        200: schemaCondition.conditions
      }
    }
  }, async function (request) {
    app.log.trace('searchCondition')

    const { title } = request.query

    return searchCondition(title, app)
  })

  app.get('/getCondition', {
    schema: {
      summary: 'Получение условия',
      description: 'Получение условия по идентификатору',
      tags: ['condition'],
      querystring: {
        type: 'object',
        required: ['conditionId'],
        additionalProperties: false,
        properties: {
          conditionId: schemaCondition.conditionId
        }
      },
      response: {
        200: schemaCondition.condition
      }
    }
  }, async function (request) {
    app.log.trace('getCondition')

    const { conditionId } = request.query

    return getCondition(conditionId, app)
  })

  app.post('/createCondition', {
    schema: {
      summary: 'Создание условия',
      description: 'Создание условия',
      tags: ['condition'],
      body: {
        type: 'object',
        required: [
          'conditionId',
          'title',
          'source'
        ],
        additionalProperties: false,
        properties: {
          conditionId: schemaCondition.conditionId,
          title: schemaCondition.title,
          source: schemaCondition.source
        }
      },
      response: {
        200: schemaCondition.condition
      }
    }
  }, async function (request) {
    app.log.trace('createCondition')

    const {
      conditionId,
      title,
      code
    } = request.body

    return createCondition(conditionId, title, code, app)
  })

  app.put('/updateCondition', {
    schema: {
      summary: 'Изменение условия',
      description: 'Изменение условия',
      tags: ['condition'],
      querystring: {
        type: 'object',
        required: ['conditionId'],
        additionalProperties: false,
        properties: {
          conditionId: schemaCondition.conditionId
        }
      },
      body: {
        type: 'object',
        minProperties: 1,
        additionalProperties: false,
        properties: {
          title: schemaCondition.title,
          source: schemaCondition.source
        }
      },
      response: {
        200: schemaCondition.condition
      }
    }
  }, async function (request) {
    app.log.trace('updateCondition')

    const { conditionId } = request.query
    const conditionData = request.body

    return updateCondition(conditionId, conditionData, app)
  })

  app.delete('/deleteCondition', {
    schema: {
      summary: 'Удаление условия',
      description: 'Удаление условия',
      tags: ['condition'],
      querystring: {
        type: 'object',
        required: ['conditionId'],
        additionalProperties: false,
        properties: {
          conditionId: schemaCondition.conditionId
        }
      }
    }
  }, async function (request, reply) {
    app.log.trace('deleteCondition')

    const { conditionId } = request.query

    await deleteCondition(conditionId, app)

    reply.send()
  })
}

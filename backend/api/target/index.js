const { schemaTarget } = require('../../schema')

const searchTarget = require('./searchTarget')
const getTarget = require('./getTarget')
const createTarget = require('./createTarget')
const updateTarget = require('./updateTarget')
const deleteTarget = require('./deleteTarget')

module.exports = async function (app) {
  app.log.info('Mount "target"')

  app.get('/searchTarget', {
    schema: {
      summary: 'Поиск целей',
      description: 'Поиск целей по названию: title like "%targetTitle%"',
      tags: ['target'],
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          title: schemaTarget.title
        }
      },
      response: {
        200: schemaTarget.targets
      }
    }
  }, async function (request) {
    app.log.trace('searchTarget')

    const { title } = request.query

    return searchTarget(title, app)
  })

  app.get('/getTarget', {
    schema: {
      summary: 'Получение цели',
      description: 'Получение цели по идентификатору',
      tags: ['target'],
      querystring: {
        type: 'object',
        required: ['targetId'],
        additionalProperties: false,
        properties: {
          targetId: schemaTarget.targetId
        }
      },
      response: {
        200: schemaTarget.target
      }
    }
  }, async function (request) {
    app.log.trace('getTarget')

    const { targetId } = request.query

    return getTarget(targetId, app)
  })

  app.post('/createTarget', {
    schema: {
      summary: 'Создание цели',
      description: 'Создание цели',
      tags: ['target'],
      body: {
        type: 'object',
        required: [
          'targetId',
          'title',
          'code'
        ],
        additionalProperties: false,
        properties: {
          targetId: schemaTarget.targetId,
          title: schemaTarget.title,
          code: schemaTarget.code
        }
      },
      response: {
        200: schemaTarget.target
      }
    }
  }, async function (request) {
    app.log.trace('createTarget')

    const {
      targetId,
      title,
      code
    } = request.body

    return createTarget(targetId, title, code, app)
  })

  app.put('/updateTarget', {
    schema: {
      summary: 'Изменение цели',
      description: 'Изменение цели',
      tags: ['target'],
      querystring: {
        type: 'object',
        required: ['targetId'],
        additionalProperties: false,
        properties: {
          targetId: schemaTarget.targetId
        }
      },
      body: {
        type: 'object',
        minProperties: 1,
        additionalProperties: false,
        properties: {
          title: schemaTarget.title,
          code: schemaTarget.code
        }
      },
      response: {
        200: schemaTarget.target
      }
    }
  }, async function (request) {
    app.log.trace('updateTarget')

    const { targetId } = request.query
    const targetData = request.body

    return updateTarget(targetId, targetData, app)
  })

  app.delete('/deleteTarget', {
    schema: {
      summary: 'Удаление цели',
      description: 'Удаление цели',
      tags: ['target'],
      querystring: {
        type: 'object',
        required: ['targetId'],
        additionalProperties: false,
        properties: {
          targetId: schemaTarget.targetId
        }
      }
    }
  }, async function (request, reply) {
    app.log.trace('deleteTarget')

    const { targetId } = request.query

    await deleteTarget(targetId, app)

    reply.send()
  })
}

const { schemaEffect } = require('../../schema')

const searchEffect = require('./searchEffect')
const getEffect = require('./getEffect')

module.exports = async function (app) {
  app.log.info('Mount "effect"')

  app.get('/searchEffect', {
    schema: {
      summary: 'Поиск эффектов',
      description: 'Поиск эффектов по названию: name like "%effectName%"',
      tags: ['effect'],
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: schemaEffect.nameSearch
        }
      },
      response: {
        200: schemaEffect.effects
      }
    }
  }, function (request) {
    app.log.trace('searchEffect')

    const { name } = request.query

    return searchEffect(name, app)
  })

  app.get('/getEffect', {
    schema: {
      summary: 'Получение эффекта',
      description: 'Получение эффекта',
      tags: ['effect'],
      querystring: {
        type: 'object',
        required: ['effectId'],
        additionalProperties: false,
        properties: {
          effectId: schemaEffect.effectId
        }
      },
      response: {
        200: schemaEffect.effect
      }
    }
  }, function (request) {
    app.log.trace('getEffect')

    const { effectId } = request.query

    return getEffect(effectId, app)
  })
}

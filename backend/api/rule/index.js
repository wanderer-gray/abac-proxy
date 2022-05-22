const {
  schemaEffect,
  schemaTarget,
  schemaCondition,
  schemaNamespace,
  schemaRule
} = require('../../schema')

const searchRule = require('./searchRule')
const getRule = require('./getRule')
const createRule = require('./createRule')
const updateRule = require('./updateRule')
const deleteRule = require('./deleteRule')

module.exports = async function (app) {
  app.log.info('Mount "rule"')

  app.get('/searchRule', {
    schema: {
      summary: 'Поиск правил',
      description: 'Поиск правил по названию: title like "%ruleTitle%"',
      tags: ['rule'],
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          title: schemaRule.title
        }
      },
      response: {
        200: schemaRule.rules
      }
    }
  }, async function (request) {
    app.log.trace('searchRule')

    const { title } = request.query

    return searchRule(title, app)
  })

  app.get('/getRule', {
    schema: {
      summary: 'Получение правила',
      description: 'Получение правила по идентификатору',
      tags: ['rule'],
      querystring: {
        type: 'object',
        required: ['ruleId'],
        additionalProperties: false,
        properties: {
          ruleId: schemaRule.ruleId
        }
      },
      response: {
        200: schemaRule.rule
      }
    }
  }, async function (request) {
    app.log.trace('getRule')

    const { ruleId } = request.query

    return getRule(ruleId, app)
  })

  app.post('/createRule', {
    schema: {
      summary: 'Создание правила',
      description: 'Создание правила',
      tags: ['rule'],
      body: {
        type: 'object',
        required: [
          'ruleId',
          'title',
          'effectId',
          'targetId',
          'conditionId',
          'namespaceName'
        ],
        additionalProperties: false,
        properties: {
          ruleId: schemaRule.ruleId,
          title: schemaRule.title,
          effectId: schemaEffect.effectId,
          targetId: schemaTarget.targetIdNullable,
          conditionId: schemaCondition.conditionId,
          namespaceName: schemaNamespace.nameNullable
        }
      },
      response: {
        200: schemaRule.rule
      }
    }
  }, async function (request) {
    app.log.trace('createRule')

    const {
      ruleId,
      title,
      effectId,
      targetId,
      conditionId,
      namespaceName
    } = request.body

    return createRule(ruleId, title, effectId, targetId, conditionId, namespaceName, app)
  })

  app.put('/updateRule', {
    schema: {
      summary: 'Изменение правила',
      description: 'Изменение правила',
      tags: ['rule'],
      querystring: {
        type: 'object',
        required: ['ruleId'],
        additionalProperties: false,
        properties: {
          ruleId: schemaRule.ruleId
        }
      },
      body: {
        type: 'object',
        minProperties: 1,
        additionalProperties: false,
        properties: {
          title: schemaRule.title,
          effectId: schemaEffect.effectId,
          targetId: schemaTarget.targetIdNullable,
          conditionId: schemaCondition.conditionId,
          namespaceName: schemaNamespace.nameNullable
        }
      },
      response: {
        200: schemaRule.rule
      }
    }
  }, async function (request) {
    app.log.trace('updateRule')

    const { ruleId } = request.query
    const ruleData = request.body

    return updateRule(ruleId, ruleData, app)
  })

  app.delete('/deleteRule', {
    schema: {
      summary: 'Удаление правила',
      description: 'Удаление правила',
      tags: ['rule'],
      querystring: {
        type: 'object',
        required: ['ruleId'],
        additionalProperties: false,
        properties: {
          ruleId: schemaRule.ruleId
        }
      }
    }
  }, async function (request, reply) {
    app.log.trace('deleteRule')

    const { ruleId } = request.query

    await deleteRule(ruleId, app)

    reply.send()
  })
}

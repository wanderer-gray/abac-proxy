const {
  schemaTarget,
  schemaAlgorithmRule,
  schemaNamespace,
  schemaRule,
  schemaPolicy
} = require('../../schema')

const searchPolicy = require('./searchPolicy')
const getPolicy = require('./getPolicy')
const createPolicy = require('./createPolicy')
const updatePolicy = require('./updatePolicy')
const deletePolicy = require('./deletePolicy')
const getRules = require('./getRules')
const setRules = require('./setRules')

module.exports = async function (app) {
  app.log.info('Mount "policy"')

  app.get('/searchPolicy', {
    schema: {
      summary: 'Поиск политик',
      description: 'Поиск политик по названию: title like "%policyTitle%"',
      tags: ['policy'],
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          title: schemaPolicy.titleSearch
        }
      },
      response: {
        200: schemaPolicy.policies
      }
    }
  }, async function (request) {
    app.log.trace('searchPolicy')

    const { title } = request.query

    return searchPolicy(title, app)
  })

  app.get('/getPolicy', {
    schema: {
      summary: 'Получение политики',
      description: 'Получение политики по идентификатору',
      tags: ['policy'],
      querystring: {
        type: 'object',
        required: ['policyId'],
        additionalProperties: false,
        properties: {
          policyId: schemaPolicy.policyId
        }
      },
      response: {
        200: schemaPolicy.policy
      }
    }
  }, async function (request) {
    app.log.trace('getPolicy')

    const { policyId } = request.query

    return getPolicy(policyId, app)
  })

  app.post('/createPolicy', {
    schema: {
      summary: 'Создание политики',
      description: 'Создание политики',
      tags: ['policy'],
      body: {
        type: 'object',
        required: [
          'policyId',
          'title',
          'targetId',
          'algorithmRuleId',
          'namespaceName'
        ],
        additionalProperties: false,
        properties: {
          policyId: schemaPolicy.policyId,
          title: schemaPolicy.title,
          targetId: schemaTarget.targetId,
          algorithmRuleId: schemaAlgorithmRule.algorithmRuleId,
          namespaceName: schemaNamespace.nameNullable
        }
      },
      response: {
        200: schemaPolicy.policy
      }
    }
  }, async function (request) {
    app.log.trace('createPolicy')

    const {
      policyId,
      title,
      targetId,
      algorithmRuleId,
      namespaceName
    } = request.body

    return createPolicy(policyId, title, targetId, algorithmRuleId, namespaceName, app)
  })

  app.put('/updatePolicy', {
    schema: {
      summary: 'Изменение политики',
      description: 'Изменение политики',
      tags: ['policy'],
      querystring: {
        type: 'object',
        required: ['policyId'],
        additionalProperties: false,
        properties: {
          policyId: schemaPolicy.policyId
        }
      },
      body: {
        type: 'object',
        minProperties: 1,
        additionalProperties: false,
        properties: {
          policyId: schemaPolicy.policyId,
          title: schemaPolicy.title,
          targetId: schemaTarget.targetId,
          algorithmRuleId: schemaAlgorithmRule.algorithmRuleId,
          namespaceName: schemaNamespace.nameNullable
        }
      },
      response: {
        200: schemaPolicy.policy
      }
    }
  }, async function (request) {
    app.log.trace('updatePolicy')

    const { policyId } = request.query
    const policyData = request.body

    return updatePolicy(policyId, policyData, app)
  })

  app.delete('/deletePolicy', {
    schema: {
      summary: 'Удаление политики',
      description: 'Удаление политики',
      tags: ['policy'],
      querystring: {
        type: 'object',
        required: ['policyId'],
        additionalProperties: false,
        properties: {
          policyId: schemaPolicy.policyId
        }
      }
    }
  }, async function (request, reply) {
    app.log.trace('deletePolicy')

    const { policyId } = request.query

    await deletePolicy(policyId, app)

    reply.send()
  })

  app.get('/getRules', {
    schema: {
      summary: 'Получение правил политики',
      description: 'Получение правил политики по идентификатору политики',
      tags: ['policy'],
      querystring: {
        type: 'object',
        required: ['policyId'],
        additionalProperties: false,
        properties: {
          policyId: schemaPolicy.policyId
        }
      },
      response: {
        200: schemaPolicy.rules
      }
    }
  }, async function (request) {
    app.log.trace('getRules')

    const { policyId } = request.query

    return getRules(policyId, app)
  })

  app.put('/setRules', {
    schema: {
      summary: 'Изменение правил политики',
      description: 'Изменение правил политики',
      tags: ['policy'],
      querystring: {
        type: 'object',
        required: ['policyId'],
        additionalProperties: false,
        properties: {
          policyId: schemaPolicy.policyId
        }
      },
      body: schemaRule.rules,
      response: {
        200: schemaPolicy.rules
      }
    }
  }, async function (request) {
    app.log.trace('setRules')

    const { policyId } = request.query
    const ruleIds = request.body

    return setRules(policyId, ruleIds, app)
  })
}

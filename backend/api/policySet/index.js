const {
  schemaTarget,
  schemaAlgorithmPolicy,
  schemaNamespace,
  schemaPolicy,
  schemaPolicySet
} = require('../../schema')

const searchPolicySet = require('./searchPolicySet')
const getPolicySet = require('./getPolicySet')
const createPolicySet = require('./createPolicySet')
const updatePolicySet = require('./updatePolicySet')
const deletePolicySet = require('./deletePolicySet')
const getPolicies = require('./getPolicies')
const setPolicies = require('./setPolicies')

module.exports = async function (app) {
  app.log.info('Mount "policySet"')

  app.get('/searchPolicySet', {
    schema: {
      summary: 'Поиск групп политик',
      description: 'Поиск групп политик по названию: title like "%policySetTitle%"',
      tags: ['policySet'],
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          title: schemaPolicySet.titleSearch
        }
      },
      response: {
        200: schemaPolicySet.policySets
      }
    }
  }, async function (request) {
    app.log.trace('searchPolicySet')

    const { title } = request.query

    return searchPolicySet(title, app)
  })

  app.get('/getPolicySet', {
    schema: {
      summary: 'Получение группы политик',
      description: 'Получение группы политик по идентификатору',
      tags: ['policySet'],
      querystring: {
        type: 'object',
        required: ['policySetId'],
        additionalProperties: false,
        properties: {
          policySetId: schemaPolicySet.policySetId
        }
      },
      response: {
        200: schemaPolicySet.policySet
      }
    }
  }, async function (request) {
    app.log.trace('getPolicySet')

    const { policySetId } = request.query

    return getPolicySet(policySetId, app)
  })

  app.post('/createPolicySet', {
    schema: {
      summary: 'Создание группы политик',
      description: 'Создание группы политик',
      tags: ['policySet'],
      body: {
        type: 'object',
        required: [
          'policySetId',
          'title',
          'targetId',
          'algorithmPolicyId',
          'namespaceName'
        ],
        additionalProperties: false,
        properties: {
          policySetId: schemaPolicySet.policySetId,
          title: schemaPolicySet.title,
          targetId: schemaTarget.targetId,
          algorithmPolicyId: schemaAlgorithmPolicy.algorithmPolicyId,
          namespaceName: schemaNamespace.nameNullable
        }
      },
      response: {
        200: schemaPolicySet.policySet
      }
    }
  }, async function (request) {
    app.log.trace('createPolicySet')

    const {
      policySetId,
      title,
      targetId,
      algorithmPolicyId,
      namespaceName
    } = request.body

    return createPolicySet(policySetId, title, targetId, algorithmPolicyId, namespaceName, app)
  })

  app.put('/updatePolicySet', {
    schema: {
      summary: 'Изменение группы политик',
      description: 'Изменение группы политик',
      tags: ['policySet'],
      querystring: {
        type: 'object',
        required: ['policySetId'],
        additionalProperties: false,
        properties: {
          policySetId: schemaPolicySet.policySetId
        }
      },
      body: {
        type: 'object',
        minProperties: 1,
        additionalProperties: false,
        properties: {
          policySetId: schemaPolicySet.policySetId,
          title: schemaPolicySet.title,
          targetId: schemaTarget.targetId,
          algorithmPolicyId: schemaAlgorithmPolicy.algorithmPolicyId,
          namespaceName: schemaNamespace.nameNullable
        }
      },
      response: {
        200: schemaPolicySet.policySet
      }
    }
  }, async function (request) {
    app.log.trace('updatePolicySet')

    const { policySetId } = request.query
    const policySetData = request.body

    return updatePolicySet(policySetId, policySetData, app)
  })

  app.delete('/deletePolicySet', {
    schema: {
      summary: 'Удаление группы политик',
      description: 'Удаление группы политик',
      tags: ['policySet'],
      querystring: {
        type: 'object',
        required: ['policySetId'],
        additionalProperties: false,
        properties: {
          policySetId: schemaPolicySet.policySetId
        }
      }
    }
  }, async function (request, reply) {
    app.log.trace('deletePolicySet')

    const { policySetId } = request.query

    await deletePolicySet(policySetId, app)

    reply.send()
  })

  app.get('/getPolicies', {
    schema: {
      summary: 'Получение политик группы',
      description: 'Получение политик группы по идентификатору группы политик',
      tags: ['policySet'],
      querystring: {
        type: 'object',
        required: ['policySetId'],
        additionalProperties: false,
        properties: {
          policySetId: schemaPolicySet.policySetId
        }
      },
      response: {
        200: schemaPolicySet.policies
      }
    }
  }, async function (request) {
    app.log.trace('getPolicies')

    const { policySetId } = request.query

    return getPolicies(policySetId, app)
  })

  app.put('/setPolicies', {
    schema: {
      summary: 'Изменение политик группы',
      description: 'Изменение политик группы',
      tags: ['policySet'],
      querystring: {
        type: 'object',
        required: ['policySetId'],
        additionalProperties: false,
        properties: {
          policySetId: schemaPolicySet.policySetId
        }
      },
      body: schemaPolicy.policies,
      response: {
        200: schemaPolicySet.policies
      }
    }
  }, async function (request) {
    app.log.trace('setPolicies')

    const { policySetId } = request.query
    const policyIds = request.body

    return setPolicies(policySetId, policyIds, app)
  })
}

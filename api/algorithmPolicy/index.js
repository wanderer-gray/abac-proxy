const { schemaAlgorithmPolicy } = require('../../schema')

const searchAlgorithmPolicy = require('./searchAlgorithmPolicy')
const getAlgorithmPolicy = require('./getAlgorithmPolicy')

module.exports = async function (app) {
  app.log.info('Mount "algorithmPolicy"')

  app.get('/searchAlgorithmPolicy', {
    schema: {
      summary: 'Поиск алгоритмов решения конфликтов для политик',
      description: 'Поиск алгоритмов решения конфликтов для политик по названию: name like "%algorithmRuleName%"',
      tags: ['algorithmPolicy'],
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: schemaAlgorithmPolicy.nameSearch
        }
      },
      response: {
        200: schemaAlgorithmPolicy.algorithmPolicies
      }
    }
  }, function (request) {
    app.log.trace('searchAlgorithmPolicy')

    const { name } = request.query

    return searchAlgorithmPolicy(name, app)
  })

  app.get('/getAlgorithmPolicy', {
    schema: {
      summary: 'Получение алгоритма решения конфликтов для политик',
      description: 'Получение алгоритма решения конфликтов для политик',
      tags: ['algorithmPolicy'],
      querystring: {
        type: 'object',
        required: ['algorithmPolicyId'],
        additionalProperties: false,
        properties: {
          algorithmPolicyId: schemaAlgorithmPolicy.algorithmPolicyId
        }
      },
      response: {
        200: schemaAlgorithmPolicy.algorithmPolicy
      }
    }
  }, function (request) {
    app.log.trace('getAlgorithmPolicy')

    const { algorithmPolicyId } = request.query

    return getAlgorithmPolicy(algorithmPolicyId, app)
  })
}

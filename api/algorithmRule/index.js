const { schemaAlgorithmRule } = require('../../schema')

const searchAlgorithmRule = require('./searchAlgorithmRule')
const getAlgorithmRule = require('./getAlgorithmRule')

module.exports = async function (app) {
  app.log.info('Mount "algorithmRule"')

  app.get('/searchAlgorithmRule', {
    schema: {
      summary: 'Поиск алгоритмов решения конфликтов для правил',
      description: 'Поиск алгоритмов решения конфликтов для правил по названию: name like "%algorithmRuleName%"',
      tags: ['algorithmRule'],
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: schemaAlgorithmRule.nameSearch
        }
      },
      response: {
        200: schemaAlgorithmRule.algorithmRules
      }
    }
  }, function (request) {
    app.log.trace('searchAlgorithmRule')

    const { name } = request.query

    return searchAlgorithmRule(name, app)
  })

  app.get('/getAlgorithmRule', {
    schema: {
      summary: 'Получение алгоритма решения конфликтов для правил',
      description: 'Получение алгоритма решения конфликтов для правил',
      tags: ['algorithmRule'],
      querystring: {
        type: 'object',
        required: ['algorithmRuleId'],
        additionalProperties: false,
        properties: {
          algorithmRuleId: schemaAlgorithmRule.algorithmRuleId
        }
      },
      response: {
        200: schemaAlgorithmRule.algorithmRule
      }
    }
  }, function (request) {
    app.log.trace('getAlgorithmRule')

    const { algorithmRuleId } = request.query

    return getAlgorithmRule(algorithmRuleId, app)
  })
}

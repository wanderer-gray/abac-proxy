const { targetId } = require('./schemaTarget')
const { algorithmRuleId } = require('./schemaAlgorithmRule')
const { nameNullable: namespaceName } = require('./schemaNamespace')
const { ruleId } = require('./schemaRule')

const policyId = {
  description: 'Идентификатор политики',
  type: 'string',
  format: 'uuid'
}

const title = {
  description: 'Название политики',
  type: 'string',
  maxLength: 255,
  default: '',
  example: 'Политика 1'
}

const policy = {
  description: 'Политика',
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
    policyId,
    title,
    targetId,
    algorithmRuleId,
    namespaceName
  }
}

const policies = {
  description: 'Политики',
  type: 'array',
  items: policyId
}

const rules = {
  description: 'Связи политик и правил',
  type: 'array',
  items: {
    description: 'Связь политики и правила',
    type: 'object',
    required: [
      'policyId',
      'ruleId'
    ],
    additionalProperties: false,
    properties: {
      policyId,
      ruleId
    }
  }
}

module.exports = {
  policyId,
  title,
  policy,
  policies,
  rules
}

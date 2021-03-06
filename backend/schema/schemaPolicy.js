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
  example: 'Политика 1'
}

const titleSearch = {
  ...title,
  default: ''
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

const policyRuleId = {
  description: 'Идентификатор связи политики и правила',
  type: 'string',
  format: 'uuid'
}

const policyRule = {
  description: 'Связь политики и правила',
  type: 'object',
  required: [
    'policyRuleId',
    'policyId',
    'ruleId'
  ],
  additionalProperties: false,
  properties: {
    policyRuleId,
    policyId,
    ruleId
  }
}

const policyRules = {
  description: 'Связи политик и правил',
  type: 'array',
  items: policyRule
}

module.exports = {
  policyId,
  title,
  titleSearch,
  policy,
  policies,
  policyRuleId,
  policyRule,
  policyRules
}

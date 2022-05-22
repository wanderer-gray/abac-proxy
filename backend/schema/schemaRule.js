const { effectId } = require('./schemaEffect')
const { targetIdNullable: targetId } = require('./schemaTarget')
const { conditionId } = require('./schemaCondition')
const { nameNullable: namespaceName } = require('./schemaNamespace')

const ruleId = {
  description: 'Идентификатор правила',
  type: 'string',
  format: 'uuid'
}

const title = {
  description: 'Название правила',
  type: 'string',
  maxLength: 255,
  default: '',
  example: 'Правило 1'
}

const rule = {
  description: 'Правило',
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
    ruleId,
    title,
    effectId,
    targetId,
    conditionId,
    namespaceName
  }
}

const rules = {
  description: 'Правила',
  type: 'array',
  items: ruleId
}

module.exports = {
  ruleId,
  title,
  rule,
  rules
}

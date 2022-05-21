const algorithmRuleId = {
  description: 'Идентификатор алгоритма решения конфликтов для правил',
  type: 'string',
  format: 'uuid'
}

const nameSearch = {
  description: 'Название алгоритма решения конфликтов для правил',
  type: 'string',
  maxLength: 255,
  default: '',
  example: 'deny-overrides'
}

const name = {
  description: 'Название алгоритма решения конфликтов для правил',
  type: 'string',
  enum: [
    'deny-overrides',
    'permit-overrides',
    'first-applicable',
    'ordered-deny-overrides',
    'ordered-permit-overrides',
    'deny-unless-permit',
    'permit-unless-deny'
  ],
  example: 'deny-overrides'
}

const algorithmRule = {
  description: 'Алгоритм решения конфликтов для правил',
  type: 'object',
  required: [
    'algorithmRuleId',
    'name'
  ],
  additionalProperties: false,
  properties: {
    algorithmRuleId,
    name
  }
}

const algorithmRules = {
  description: 'Алгоритмы решения конфликтов для правил',
  type: 'array',
  items: algorithmRuleId
}

module.exports = {
  algorithmRuleId,
  nameSearch,
  name,
  algorithmRule,
  algorithmRules
}

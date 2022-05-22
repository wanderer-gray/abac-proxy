const algorithmPolicyId = {
  description: 'Идентификатор алгоритма решения конфликтов для политик',
  type: 'string',
  format: 'uuid'
}

const nameSearch = {
  description: 'Название алгоритма решения конфликтов для политик',
  type: 'string',
  maxLength: 255,
  default: '',
  example: 'deny-overrides'
}

const name = {
  description: 'Название алгоритма решения конфликтов для политик',
  type: 'string',
  enum: [
    'deny-overrides',
    'permit-overrides',
    'first-applicable',
    'only-one-applicable',
    'ordered-deny-overrides',
    'ordered-permit-overrides',
    'deny-unless-permit',
    'permit-unless-deny'
  ],
  example: 'deny-overrides'
}

const algorithmPolicy = {
  description: 'Алгоритм решения конфликтов для политик',
  type: 'object',
  required: [
    'algorithmPolicyId',
    'name'
  ],
  additionalProperties: false,
  properties: {
    algorithmPolicyId,
    name
  }
}

const algorithmPolicies = {
  description: 'Алгоритмы решения конфликтов для политик',
  type: 'array',
  items: algorithmPolicyId
}

module.exports = {
  algorithmPolicyId,
  nameSearch,
  name,
  algorithmPolicy,
  algorithmPolicies
}

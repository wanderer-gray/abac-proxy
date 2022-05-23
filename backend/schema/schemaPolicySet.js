const { targetId } = require('./schemaTarget')
const { algorithmPolicyId } = require('./schemaAlgorithmPolicy')
const { nameNullable: namespaceName } = require('./schemaNamespace')
const { policyId } = require('./schemaPolicy')

const policySetId = {
  description: 'Идентификатор группы политик',
  type: 'string',
  format: 'uuid'
}

const title = {
  description: 'Название группы политик',
  type: 'string',
  maxLength: 255,
  example: 'Группа политик 1'
}

const titleSearch = {
  ...title,
  default: ''
}

const policySet = {
  description: 'Группа политик',
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
    policySetId,
    title,
    targetId,
    algorithmPolicyId,
    namespaceName
  }
}

const policySets = {
  description: 'Группы политик',
  type: 'array',
  items: policySetId
}

const policySetPolicyId = {
  description: 'Идентификатор связи группы политик и политики',
  type: 'string',
  format: 'uuid'
}

const policySetPolicy = {
  description: 'Связь группы политик и политики',
  type: 'object',
  required: [
    'policySetPolicyId',
    'policySetId',
    'policyId'
  ],
  additionalProperties: false,
  properties: {
    policySetPolicyId,
    policySetId,
    policyId
  }
}

const policySetPolicies = {
  description: 'Связи групп политик и политик',
  type: 'array',
  items: policySetPolicy
}

module.exports = {
  policySetId,
  title,
  titleSearch,
  policySet,
  policySets,
  policySetPolicyId,
  policySetPolicy,
  policySetPolicies
}

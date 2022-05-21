const conditionId = {
  description: 'Идентификатор условия',
  type: 'string',
  format: 'uuid'
}

const title = {
  description: 'Название условия',
  type: 'string',
  maxLength: 255,
  default: '',
  example: 'Условие 1'
}

const code = {
  description: 'Код условия',
  type: 'object',
  example: {
    class: 'value',
    type: 'boolean',
    value: true
  }
}

const condition = {
  description: 'Условие',
  type: 'object',
  required: [
    'conditionId',
    'title',
    'code'
  ],
  additionalProperties: false,
  properties: {
    conditionId,
    title,
    code
  }
}

const conditions = {
  description: 'Условия',
  type: 'array',
  items: conditionId
}

module.exports = {
  conditionId,
  title,
  code,
  condition,
  conditions
}

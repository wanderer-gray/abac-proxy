const conditionId = {
  description: 'Идентификатор условия',
  type: 'string',
  format: 'uuid'
}

const title = {
  description: 'Название условия',
  type: 'string',
  maxLength: 255,
  example: 'Условие 1'
}

const titleSearch = {
  ...title,
  default: ''
}

const source = {
  description: 'Исходный код условия',
  type: 'string',
  example: 'abc == 123'
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
    'source',
    'code'
  ],
  additionalProperties: false,
  properties: {
    conditionId,
    title,
    source,
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
  titleSearch,
  source,
  condition,
  conditions
}

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

const condition = {
  description: 'Условие',
  type: 'object',
  required: [
    'conditionId',
    'title',
    'source'
  ],
  additionalProperties: false,
  properties: {
    conditionId,
    title,
    source
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

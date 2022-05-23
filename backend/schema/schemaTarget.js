const targetId = {
  description: 'Идентификатор цели',
  type: 'string',
  format: 'uuid'
}

const targetIdNullable = {
  ...targetId,
  nullable: true
}

const title = {
  description: 'Название цели',
  type: 'string',
  maxLength: 255,
  example: 'Цель 1'
}

const titleSearch = {
  ...title,
  default: ''
}

const source = {
  description: 'Исходный код цели',
  type: 'string',
  example: 'abc == 123'
}

const target = {
  description: 'Цель',
  type: 'object',
  required: [
    'targetId',
    'title',
    'source'
  ],
  additionalProperties: false,
  properties: {
    targetId,
    title,
    source
  }
}

const targets = {
  description: 'Цели',
  type: 'array',
  items: targetId
}

module.exports = {
  targetId,
  targetIdNullable,
  title,
  titleSearch,
  source,
  target,
  targets
}

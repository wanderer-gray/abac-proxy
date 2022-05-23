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

const code = {
  description: 'Код цели',
  type: 'object',
  example: {
    class: 'value',
    type: 'boolean',
    value: true
  }
}

const target = {
  description: 'Цель',
  type: 'object',
  required: [
    'targetId',
    'title',
    'source',
    'code'
  ],
  additionalProperties: false,
  properties: {
    targetId,
    title,
    source,
    code
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

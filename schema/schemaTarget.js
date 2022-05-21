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
  default: '',
  example: 'Цель 1'
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
    'code'
  ],
  additionalProperties: false,
  properties: {
    targetId,
    title,
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
  code,
  target,
  targets
}

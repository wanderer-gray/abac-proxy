const effectId = {
  description: 'Идентификатор эффекта',
  type: 'string',
  format: 'uuid'
}

const nameSearch = {
  description: 'Название эффекта',
  type: 'string',
  maxLength: 255,
  default: '',
  example: 'permit'
}

const name = {
  description: 'Название эффекта',
  type: 'string',
  enum: [
    'permit',
    'deny'
  ],
  example: 'permit'
}

const effect = {
  description: 'Эффект',
  type: 'object',
  required: [
    'effectId',
    'name'
  ],
  additionalProperties: false,
  properties: {
    effectId,
    name
  }
}

const effects = {
  description: 'Эффекты',
  type: 'array',
  items: effectId
}

module.exports = {
  effectId,
  nameSearch,
  name,
  effect,
  effects
}

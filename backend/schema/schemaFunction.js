const name = {
  description: 'Название функции',
  type: 'string',
  maxLength: 255,
  example: 'мега_функция'
}

const nameSearch = {
  ...name,
  default: ''
}

const argSchema = {
  description: 'Схема аргумента',
  type: 'object',
  additionalProperties: true,
  example: {
    type: 'string'
  }
}

const argSettings = {
  description: 'Настройки аргумента',
  type: 'object',
  required: ['schema'],
  additionalProperties: false,
  properties: {
    schema: argSchema
  }
}

const argsSettings = {
  description: 'Настройки аргументов',
  type: 'array',
  items: argSettings
}

const resultSchema = {
  description: 'Схема результата',
  type: 'object',
  additionalProperties: true,
  example: {
    type: 'string'
  }
}

const resultSettings = {
  description: 'Настройки результата',
  type: 'object',
  required: ['schema'],
  additionalProperties: false,
  properties: {
    schema: resultSchema
  }
}

const _function = {
  description: 'Функция',
  type: 'object',
  required: [
    'name',
    'argsSettings',
    'resultSettings'
  ],
  additionalProperties: false,
  properties: {
    name,
    argsSettings,
    resultSettings
  }
}

const functions = {
  description: 'Функции',
  type: 'array',
  items: name
}

module.exports = {
  name,
  nameSearch,
  argsSettings,
  resultSettings,
  function: _function,
  functions
}

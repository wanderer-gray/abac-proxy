const name = {
  description: 'Название атрибута',
  type: 'string',
  maxLength: 255,
  example: 'мега_атрибут'
}

const nameSearch = {
  ...name,
  default: ''
}

const path = {
  description: 'Путь атрибута',
  type: 'array',
  items: {
    type: 'string',
    maxLength: 255
  },
  example: ['abc']
}

const schema = {
  description: 'Схема атрибута',
  type: 'object',
  example: {
    type: 'string'
  }
}

const computer = {
  description: 'Функция вычисления атрибута',
  type: 'boolean',
  example: true
}

const attribute = {
  description: 'Должность',
  type: 'object',
  required: [
    'name',
    'path',
    'schema',
    'computer'
  ],
  additionalProperties: false,
  properties: {
    name,
    path,
    schema,
    computer
  }
}

const attributes = {
  description: 'Атрибуты',
  type: 'array',
  items: name
}

module.exports = {
  name,
  nameSearch,
  path,
  schema,
  computer,
  attribute,
  attributes
}

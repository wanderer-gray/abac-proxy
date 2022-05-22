const name = {
  description: 'Название пространства имен',
  type: 'string',
  maxLength: 255,
  default: '',
  example: 'system'
}

const nameNullable = {
  ...name,
  nullable: true
}

const namespace = {
  description: 'Пространство имен',
  type: 'object',
  required: ['name'],
  additionalProperties: false,
  properties: {
    name
  }
}

const namespaces = {
  description: 'Пространства имен',
  type: 'array',
  items: name
}

module.exports = {
  name,
  nameNullable,
  namespace,
  namespaces
}

const userId = {
  description: 'Идентификатор пользователя',
  type: 'string',
  format: 'uuid'
}

const nickname = {
  description: 'Логин пользователя',
  type: 'string',
  maxLength: 255,
  example: 'admin'
}

const password = {
  description: 'Пароль пользователя',
  type: 'string',
  maxLength: 255,
  example: '123456'
}

const user = {
  description: 'Пользователь',
  type: 'object',
  required: [
    'userId',
    'nickname'
  ],
  additionalProperties: false,
  properties: {
    userId,
    nickname
  }
}

const users = {
  description: 'Пользователи',
  type: 'array',
  items: userId
}

module.exports = {
  userId,
  nickname,
  password,
  user,
  users
}

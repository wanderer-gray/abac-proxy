const userId = {
  description: 'Идентификатор пользователя',
  type: 'string',
  format: 'uuid'
}

const nickname = {
  description: 'Ник пользователя',
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

module.exports = {
  userId,
  nickname,
  password
}

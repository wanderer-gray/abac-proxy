const {
  Namespace,
  Attribute
} = require('abac-kernel')
const system = require('./system')

const userId = Attribute.new({
  name: 'userId',
  path: ['body', 'userId'],
  schema: { type: 'string' }
})

const nickname = Attribute.new({
  name: 'nickname',
  path: ['body', 'nickname'],
  schema: { type: 'string' }
})

const password = Attribute.new({
  name: 'password',
  path: ['body', 'password'],
  schema: { type: 'string' }
})

module.exports = Namespace.new({ name: 'user', root: system })
  .addAttribute(userId)
  .addAttribute(nickname)
  .addAttribute(password)

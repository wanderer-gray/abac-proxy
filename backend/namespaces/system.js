const {
  Namespace,
  Attribute
} = require('abac-kernel')

const ip = Attribute.new({
  name: 'ip',
  path: ['ip'],
  schema: {
    type: 'string'
  }
})

const protocol = Attribute.new({
  name: 'protocol',
  path: ['protocol'],
  schema: {
    type: 'string'
  }
})

module.exports = Namespace.new({ name: 'system' })
  .addAttribute(ip)
  .addAttribute(protocol)

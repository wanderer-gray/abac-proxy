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

const url = Attribute.new({
  name: 'url',
  path: ['url'],
  schema: {
    type: 'string'
  }
})

const method = Attribute.new({
  name: 'method',
  path: ['method'],
  schema: {
    type: 'string'
  }
})

const headers = Attribute.new({
  name: 'headers',
  path: ['headers'],
  schema: {
    type: 'object'
  }
})

const query = Attribute.new({
  name: 'query',
  path: ['query'],
  schema: {
    type: 'object'
  }
})

const body = Attribute.new({
  name: 'body',
  path: ['body'],
  schema: {
    type: 'object',
    nullable: true
  }
})

module.exports = Namespace.new({ name: 'system' })
  .addAttribute(ip)
  .addAttribute(protocol)
  .addAttribute(url)
  .addAttribute(method)
  .addAttribute(headers)
  .addAttribute(query)
  .addAttribute(body)
